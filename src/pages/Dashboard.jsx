import React from 'react';
import { useWeather } from '../context/WeatherContext';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import { CloudSun } from 'lucide-react';

const Dashboard = () => {
  const { favorites, addFavorite, removeFavorite } = useWeather();

  const handleCitySelect = (city) => {
    addFavorite(city);
  };

  return (
    <div className="container">
      <header style={{ textAlign: "center", marginBottom: "3rem", paddingTop: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
             <h1 className="title-large text-gradient">
               Weather App
             </h1>
        </div>
        <SearchBar onSelect={handleCitySelect} />
      </header>

      <section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "var(--text-primary)" }}>Favorite Cities</h2>
          <span style={{ color: "var(--text-secondary)" }}>{favorites.length} saved locations</span>
        </div>

        {favorites.length === 0 ? (
          <div className="glass-panel" style={{ padding: "4rem", textAlign: "center", color: "var(--text-secondary)" }}>
            <CloudSun size={48} style={{ opacity: 0.5, marginBottom: "1rem" }} />
            <p style={{ fontSize: "1.2rem" }}>You haven't added any favorite cities yet.</p>
            <p className="text-muted">Use the search bar above to find and track weather patterns.</p>
          </div>
        ) : (
          <div className="grid-cards">
            {favorites.map((city) => (
              <Card key={city.id} city={city} onRemove={removeFavorite} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
