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

  return (
    <div>

    </div>
  );
};

export default App
