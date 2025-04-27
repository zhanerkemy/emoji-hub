import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmojiCard = ({ emoji }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [displayStyle, setDisplayStyle] = useState('symbol');

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(fav => fav.name === emoji.name));
  }, [emoji.name]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.name !== emoji.name);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(emoji);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  const renderEmoji = () => {
    switch (displayStyle) {
      case 'symbol':
        return <div className="emoji-symbol" dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }} />;
      case 'html':
        return <div className="emoji-symbol">{emoji.htmlCode[0]}</div>;
      case 'unicode':
        return <div className="emoji-symbol">{emoji.unicode.join(' ')}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="emoji-card">
      <Link to={`/emoji/${encodeURIComponent(emoji.name)}`}>
        {renderEmoji()}
        <div className="emoji-name">{emoji.name}</div>
        <div className="emoji-category">{emoji.category}</div>
      </Link>
      <div className="emoji-controls">
      <label>
        Style:
        <select value={displayStyle} onChange={(e) => setDisplayStyle(e.target.value)} className="style-select">
          <option value="symbol">Symbol</option>
          <option value="html">HTML Code</option>
          <option value="unicode">Unicode</option>
        </select>
      </label>

        <button onClick={toggleFavorite} style={{ color: isFavorite ? 'deeppink' : 'gray' }}>
          {isFavorite ? '💖' : '🤍'}
        </button>
      </div>
    </div>
  );
};

export default EmojiCard;