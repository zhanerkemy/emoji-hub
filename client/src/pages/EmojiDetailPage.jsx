import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmojiDetailPage = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [emoji, setEmoji] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://emoji-hub-production.up.railway.app/api/emojis')
      .then(response => {
        const foundEmoji = response.data.find(e => e.name === decodedName);
        setEmoji(foundEmoji);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading emoji:', error);
        setLoading(false);
      });
  }, [name]);

  useEffect(() => {
    if (emoji) {
      axios.post('https://emoji-hub-production.up.railway.app/api/describe', { emoji: emoji.name })
        .then(response => {
          setDescription(response.data.description);
        })
        .catch(error => {
          console.error('Error getting description of emoji:', error);
        });
    }
  }, [emoji]);

  if (loading) {
    return <p style={{ textAlign: 'center' }}>Loading...</p>;
  }

  if (!emoji) {
    return <p style={{ textAlign: 'center' }}>Emoji not found.</p>;
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '0 auto', 
      background: 'white', 
      padding: '30px', 
      borderRadius: '20px',
      textAlign: 'center'
    }}>
      <div dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }} style={{ fontSize: '80px' }} />
      <h2 style={{ margin: '20px 0' }}>{emoji.name}</h2>
      <p><strong>Category:</strong> {emoji.category}</p>
      <p><strong>Group:</strong> {emoji.group}</p>
      <p><strong>Unicode:</strong> {emoji.unicode.join(', ')}</p>
      <p style={{ marginTop: '20px', fontSize: '18px', color: '#646464' }}>
        {description}
      </p>
    </div>
  );
};

export default EmojiDetailPage;
