import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WeatherProvider } from './context/WeatherContext';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <WeatherProvider>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/details/:lat/:lon" element={<Details />} />
          </Routes>
        </div>
      </WeatherProvider>
    </Router>
  );
}

export default App;
