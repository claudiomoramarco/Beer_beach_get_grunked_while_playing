import React, { useState, useEffect } from 'react';
import { Timer, Pause, Play, RotateCcw } from 'lucide-react';

interface GameTimerProps {
  onReset: () => void;
}

const GameTimer: React.FC<GameTimerProps> = ({ onReset }) => {
  const [time, setTime] = useState(480); // 8 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(480);
    setIsRunning(false);
    onReset();
  };

  const handleSwitch = () => {
    // Implement team switch logic here
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <div className="bg-yellow-400 px-8 py-4 rounded-lg">
        <span className="text-4xl font-mono font-bold">{formatTime(time)}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="bg-yellow-400 p-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <button
          onClick={handleReset}
          className="bg-yellow-400 p-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
        <button
          onClick={handleSwitch}
          className="bg-yellow-400 px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-bold"
        >
          SWITCH
        </button>
      </div>
    </div>
  );
};

export default GameTimer;