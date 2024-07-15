import { useState, useEffect } from "react";
import Godot from "./godot";
import "./App.css";

function App() {
  const [gameInitialized, setGameInitialized] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);

  useEffect(() => {
    // Initialize the game only once
    if (!gameInitialized) {
      setGameInitialized(true);
    }
  }, []);

  const toggleGameVisibility = () => {
    setGameVisible(!gameVisible);
  };

  return (
    <div className="app-container flex h-[100%] w-[100%] items-center justify-center flex-col">
      <div className="game-area" style={{ display: gameVisible ? 'block' : 'none' }}>
        <h1 className="app-title">React Game Thing Testing</h1>
        {gameInitialized && <Godot width={500} height={500} />}
      </div>
      
      <button onClick={toggleGameVisibility} className="toggle-button">
        {gameVisible ? "Hide Game" : "Show Game"}
      </button>
      
      <div className="other-content">
        <p>This is other content that should coexist with the game.</p>
      </div>
    </div>
  );
}

export default App;