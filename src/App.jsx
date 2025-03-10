import { useState } from 'react';
import UrlShortener from './components/UrlShortener';
import './App.css';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`app ${theme}`}>
      <div className="container mt-5">
        <h1 className="text-center mb-4">URL Shortener</h1>
        <UrlShortener />
        <button className="btn btn-secondary mt-3" onClick={toggleTheme}>
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
    </div>
  );
}

export default App;