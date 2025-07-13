import { useState, useRef, useEffect } from 'react'
import './styles.css';

const App: React.FC = () => {
  
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [clickCount, setClickCount] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [duration, setDuration] = useState<number>(5);

  const intervalRef = useRef<number | null>(null);

  const startGame = () => {
    setIsGameRunning(true);
    setTimeLeft(duration);
    setClickCount(0);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsGameRunning(false);
          setHighScore((prevHight) => Math.max(prevHight, clickCount));
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (isGameRunning) {
      setClickCount((prev) => prev + 1);
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setDuration(value);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  const clicksPerSecond = clickCount / duration;


  return (
    <div className="app-container">
      <div className="game-card">
        <h1>Click Speed Test</h1>

        <div className='stats'>
          <p>Time Left: {timeLeft}</p>
          <p>Clicks: {clickCount}</p>
          <p>High Score: {highScore}</p>
          {!isGameRunning && timeLeft === 0 && (
            <p>Clicks per Second: {clicksPerSecond.toFixed(2)}</p>
          )}
        </div>

        <div className="duration-input">
          <label> Test Duration (seconds): </label>
          <input
            type="number"
            value={duration}
            onChange={handleDurationChange}
            disabled={isGameRunning}
            min="1"
          />

          <div className='button-group'>
            <button
              onClick={startGame}
              disabled={isGameRunning}
              className={`start-button ${isGameRunning ? 'disabled' : ''}`}
            >
              Start Test
            </button>

            <button
              onClick={handleClick}
              disabled={!isGameRunning}
              className={`click-button ${isGameRunning ? 'disabled' : ''}`}
            >
              Click Me!
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App
