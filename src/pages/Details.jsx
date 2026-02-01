import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Wind, Droplets, Sun, Sunrise, Sunset } from 'lucide-react';
import { getWeatherData, getWeatherDescription } from '../services/api';
import Chart from '../components/Chart';
import { formatTime, formatDate } from '../utils/helpers';
import { useWeather } from '../context/WeatherContext';

const Details = () => {
  const { lat, lon } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addFavorite, favorites } = useWeather();
  
  const city = location.state?.city || { name: 'Unknown Location' };
  const isFavorite = favorites.some(fav => fav.id === city.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await getWeatherData(lat, lon);
        setData(weatherData);
      } catch (err) {
        console.error("Failed to load details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lat, lon]);

  if (loading) return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div className="text-secondary" style={{ fontSize: '1.5rem' }}>Loading analytics...</div>
    </div>
  );
  
  if (!data) return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ color: 'var(--danger)', fontSize: '1.5rem' }}>Failed to load weather data.</div>
    </div>
  );

  const current = data.current;
  const hourly = data.hourly;
  const daily = data.daily;

  const next24Hours = hourly.time.slice(0, 24).map((t, i) => ({
    time: formatTime(t),
    temp: Math.round(hourly.temperature_2m[i]),
    rain: hourly.precipitation_probability[i],
    wind: Math.round(hourly.wind_speed_10m[i])
  }));

  const dailyForecast = daily.time.map((t, i) => ({
    date: formatDate(t),
    max: Math.round(daily.temperature_2m_max[i]),
    min: Math.round(daily.temperature_2m_min[i]),
    code: daily.weather_code[i],
    rain: daily.precipitation_probability_max[i]
  }));

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/')} 
          className="btn-back"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        {!isFavorite && (
          <button 
            className="btn-primary"
            onClick={() => addFavorite(city)}
          >
            Add to Favorites
          </button>
        )}
      </div>

      <div className="grid-details" style={{ marginBottom: '2rem' }}>
        
        <div className="glass-panel col-span-8" style={{ padding: '3rem' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
             <div>
               <h1 style={{ margin: 0, fontSize: '3rem', fontWeight: 700 }} className="text-gradient">{city.name}</h1>
               <p className="text-secondary" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>
                 {formatDate(new Date().toISOString(), 'EEEE, MMMM d')}
               </p>
             </div>
             <div style={{ textAlign: 'right' }}>
               <span style={{ fontSize: '5rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
                 {Math.round(current.temperature_2m)}°
               </span>
               <div style={{ fontSize: '1.5rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 500 }}>
                 {getWeatherDescription(current.weather_code)}
               </div>
             </div>
           </div>
           
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '4rem' }}>
             <StatItem icon={<Wind size={24} />} label="Wind" value={`${current.wind_speed_10m} km/h`} />
             <StatItem icon={<Droplets size={24} />} label="Humidity" value={`${current.relative_humidity_2m}%`} />
             <StatItem icon={<Sun size={24} />} label="UV Index" value="High" />
             <StatItem icon={<Clock size={24} />} label="Pressure" value={`${current.pressure_msl} hPa`} />
           </div>
        </div>

        <div className="glass-panel col-span-4" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
           <h3 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
             <Calendar size={20} style={{ color: 'var(--primary)' }} /> 7-Day Forecast
           </h3>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
             {dailyForecast.map((day, i) => (
               <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <span style={{ width: '80px', fontWeight: '500', color: i === 0 ? 'var(--primary)' : 'inherit' }}>
                   {i === 0 ? 'Today' : day.date}
                 </span>
                 <div style={{ flex: 1, padding: '0 1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {getWeatherDescription(day.code)}
                 </div>
                 <div style={{ fontWeight: '600' }}>
                   <span style={{ color: 'var(--text-primary)' }}>{day.max}°</span>
                   <span style={{ color: 'var(--text-secondary)', marginLeft: '8px' }}>{day.min}°</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
      
      <div className="grid-cards">
        <Chart 
          data={next24Hours} 
          dataKey="temp" 
          color="#38bdf8" 
          title="Hourly Temperature" 
          unit="°"
        />
        <Chart 
          data={next24Hours} 
          type="bar" 
          dataKey="rain" 
          color="#818cf8" 
          title="Precipitation Chance" 
          unit="%"
        />
        <Chart 
          data={next24Hours} 
          type="area" 
          dataKey="wind" 
          color="#c084fc" 
          title="Wind Speed" 
          unit=" km/h"
        />
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ color: 'var(--secondary)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</div>
    <div style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '0.25rem' }}>{value}</div>
  </div>
);

export default Details;
