// HeartsContainer.jsx
"use client"
import React, { useEffect, useState } from 'react';
import './Heart.css'; 

type HeartT = {
    id: number;
    randomDuration: string;
    randomLeft: string;
};

const Heart = ({style}: {style: React.CSSProperties}) => {
    return(
    <svg className="heart" viewBox="0 0 32 29.6" style={style}>
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
    </svg>)
}


const HeartsContainer = () => {
  const [hearts, setHearts] = useState<HeartT[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Math.random(),
        randomDuration: `${Math.random() * 5 + 3}s`, // Between 3 and 8 seconds
        randomLeft: `${Math.random() * 100}%`, // Between 0 and 1
      };
      setHearts((prevHearts) => [...prevHearts, newHeart]);
      
      // Optionally, limit the number of hearts on screen
      if (hearts.length > 50) {
        setHearts((prevHearts) => prevHearts.slice(1));
      }
    }, 200); // Every 200ms create a new heart

    return () => clearInterval(interval);
  }, [hearts.length]);

  return (
    <div>
      {hearts.map((heart) => (
        <Heart
        key={heart.id}
        style={{
          left: heart.randomLeft,
          animationDuration: heart.randomDuration,
        }}
      />
      ))}
    </div>
  );
};

export default HeartsContainer;
