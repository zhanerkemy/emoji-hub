import React, { useEffect, useState } from 'react';
import EmojiCard from '../components/EmojiCard';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className='favorites-page'>
      <h2>Favorite emojis</h2>
      {favorites.length === 0 ? (
        <p>You don't have any favorite emojis.</p>
      ) : (
        <div className="emoji-grid">
          {favorites.map((emoji, index) => (
            <EmojiCard key={index} emoji={emoji} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
