import Home from './pages/Home';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmojiCatalog from './components/EmojiCatalog';
import FavoritesPage from './pages/FavoritesPage';
import EmojiDetailPage from './pages/EmojiDetailPage';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Router>
      <div className="App">
        <header className="header">
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/catalog">Catalog</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>

        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<EmojiCatalog searchTerm={searchTerm} />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/emoji/:name" element={<EmojiDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;