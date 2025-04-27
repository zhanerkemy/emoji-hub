import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmojiCard from './EmojiCard';

const EmojiCatalog = ({ searchTerm }) => {
  const [emojis, setEmojis] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(18);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('A-Z');
  
  const loadMoreEmojis = () => {
    setVisibleCount(prevCount => prevCount + 18);
  };

  useEffect(() => {
    axios.get('https://https://emoji-hub-production.up.railway.app/api/emojis')
      .then(response => {
        setEmojis(response.data);
        const uniqueCategories = [...new Set(response.data.map(emoji => emoji.category))];
        setCategories(uniqueCategories);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading emoji:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredEmojis = emojis.filter(emoji =>
    (selectedCategory === '' || emoji.category === selectedCategory) &&
    emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmojis = [...filteredEmojis].sort((a, b) => {
    if (sortOrder === 'A-Z') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  
  return (
    <div>
      <div>
        <h1>EmojiHub</h1>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#D86F29' : '#fff',
              color: selectedCategory === category ? '#fff' : '#646464',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            backgroundColor: '#D86F29',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            cursor: 'pointer',
            appearance: 'none',
            textAlign: 'center',
            width: '100px'
          }}
        >
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: '#646464' }}>
          Loading...
        </div>
      ) : (
        filteredEmojis.length > 0 ? (
          <div className="emoji-grid">
            {sortedEmojis.slice(0, visibleCount).map((emoji, index) => (
              <EmojiCard key={index} emoji={emoji} />
            ))}

          </div>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px', color: '#646464' }}>
            Nothing found.
          </div>
        )
      )}

      {visibleCount < filteredEmojis.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <button onClick={loadMoreEmojis} className="more-emojis-button">
            More emojis...
          </button>
        </div>
      )}

    </div>
  );
};

export default EmojiCatalog;
