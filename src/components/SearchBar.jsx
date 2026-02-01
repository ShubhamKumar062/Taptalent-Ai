import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchCities } from '../services/api';
import { useWeather } from '../context/WeatherContext';

const SearchBar = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        const cities = await searchCities(query);
        setResults(cities);
        setLoading(false);
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (city) => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    if (onSelect) onSelect(city);
  };

  return (
    <div className="search-container" ref={wrapperRef} style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
      <div className="search-input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={20} style={{ position: 'absolute', left: '16px', color: 'var(--text-secondary)' }} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a city..."
          className="glass-input"
          style={{ paddingLeft: '48px' }}
        />
        {loading && (
          <div style={{ position: 'absolute', right: '16px', color: 'var(--text-secondary)' }}>
            ...
          </div>
        )}
      </div>

      {showResults && results.length > 0 && (
        <ul className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '12px',
          listStyle: 'none',
          padding: '8px',
          zIndex: 50,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {results.map((city) => (
            <li
              key={city.id}
              onClick={() => handleSelect(city)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{city.name}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
