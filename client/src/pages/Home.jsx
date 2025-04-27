import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '100px', 
      color: '#646464' 
    }}>
    <h1 style={{ fontSize: window.innerWidth < 768 ? '32px' : '48px', marginBottom: '20px', color: '#D86F29' }}>
        Welcome to EmojiHub!
    </h1>

    <p style={{ fontSize: window.innerWidth < 768 ? '16px' : '20px', marginBottom: '40px' }}>
        <Typewriter
            words={['Discover thousands of emojis, explore feelings, moods and more ✨']}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={30}
            delaySpeed={1500}
        />
    </p>

    <Link to="/catalog">
      <button style={{
        backgroundColor: '#D86F29',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '10px 20px',
        fontSize: '18px',
        cursor: 'pointer'
      }}>
        Explore Emojis
      </button>
    </Link>
    </div>
  );
};

export default Home;