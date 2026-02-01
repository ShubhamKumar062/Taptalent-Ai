import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Wind, Droplets } from 'lucide-react';
import { getWeatherData, getWeatherDescription } from '../services/api';

const Card = ({ city, onRemove }) => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWeatherData(city.latitude, city.longitude);
        setWeather(data);
      } catch (err) {
        console.error("Failed to load weather for card", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);

  const handleClick = () => {
    navigate(`/details/${city.latitude}/${city.longitude}`, { state: { city } });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onRemove(city.id);
  };

  if (loading) return (
    <div className="glass-panel" style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
      Loading...
    </div>
  );

  if (!weather) return (
    <div className="glass-panel" style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--danger)' }}>
      Error loading data
    </div>
  );

  const current = weather.current;

  return (
    <div 
      className="glass-panel" 
      onClick={handleClick}
      style={{
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '220px',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: 0 }}>{city.name}</h2>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
             {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
          </p>
        </div>
        <button 
          onClick={handleRemove}
          className="btn-icon"
          title="Remove from favorites"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '1.5rem' }}>
         <div style={{ display: 'flex', flexDirection: 'column' }}>
           <span style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
             {Math.round(current.temperature_2m)}°
           </span>
           <span style={{ fontSize: '1.1rem', color: 'var(--primary)', marginTop: '0.5rem', fontWeight: 500 }}>
             {getWeatherDescription(current.weather_code)}
           </span>
         </div>
         
         <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
           <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
             <Wind size={16} /> {current.wind_speed_10m} <span style={{ fontSize: '0.8em' }}>km/h</span>
           </div>
           <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
             <Droplets size={16} /> {current.relative_humidity_2m}%
           </div>
         </div>
      </div>
    </div>
  );
};

export default Card;
