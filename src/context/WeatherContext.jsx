import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherContext = createContext();
export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weather_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [unit, setUnit] = useState('C'); 

  useEffect(() => {
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (city) => {
    if (!favorites.some((fav) => fav.id === city.id)) {
      setFavorites([...favorites, city]);
    }
  };

  const removeFavorite = (cityId) => {
    setFavorites(favorites.filter((fav) => fav.id !== cityId));
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  return (
    <WeatherContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        unit,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
