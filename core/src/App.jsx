import { games } from './gdConfig';
import GGen from './godot2';
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [gameIndex, setGameIndex] = useState(0);
  const [key, setKey] = useState(0);
  const ggenRef = useRef(null);

  const btnPress = () => {
    setGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    setKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    if (ggenRef.current && ggenRef.current.resetGame) {
      ggenRef.current.resetGame();
    }
  }, [gameIndex]);

  return (
    <div className="app-container">
      <div className="z-30 bg-black opacity-45 text-white">
        <h1 className="app-title">Godot Games</h1>
        <button className="w-10 h-10 hover:cursor-pointer" onClick={btnPress}>
          Change Game
        </button>
      </div>
      <div className="game-list">
        <div className="game-item">
          <GGen 
            key={key} 
            ref={ggenRef}
            gdConfig={games[gameIndex]} 
          />
        </div>
      </div>
    </div>
  );
}