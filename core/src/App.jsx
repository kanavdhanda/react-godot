import { useState, useEffect } from "react";
import Godot from "./godot";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

function GameWrapper() {
  const [gameInitialized, setGameInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!gameInitialized) {
      setGameInitialized(true);
    }
  }, []);

  const isGameRoute = location.pathname === "/game";

  return (
    <div className={`game-area ${isGameRoute ? 'visible' : 'hidden'}`}>
      {gameInitialized && <Godot width={500} height={500} />}
    </div>
  );
}

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleGameVisibility = () => {
    if (location.pathname === "/game") {
      navigate("/");
    } else {
      navigate("/game");
    }
  };

  return (
    <div className="navigation">
      <button onClick={toggleGameVisibility} className="toggle-button">
        {location.pathname === "/game" ? "Hide Game" : "Show Game"}
      </button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <GameWrapper />
        <Routes>
          <Route path="/game" element={
            <h1 className="app-title">React Game Thing Testing</h1>
          } />
          <Route path="/" element={
            <div className="home-content">
              <h1>Home</h1>
              <p>Welcome to the home page. Click "Show Game" to play.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;