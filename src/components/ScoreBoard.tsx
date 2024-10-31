import React from 'react';
import { Beer } from 'lucide-react';

interface ScoreBoardProps {
  team: string;
  score: number;
  beers: number;
  color: 'emerald' | 'blue';
  onScore: (button: string) => void;
  onBeer: () => void;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ 
  team, 
  score, 
  beers, 
  color,
  onScore,
  onBeer 
}) => {
  const baseColor = color === 'emerald' ? 'bg-emerald-400' : 'bg-blue-800';
  const textColor = color === 'emerald' ? 'text-emerald-400' : 'text-blue-800';
  const buttons = [
    { key: 'N', beers: 1 },
    { key: 'B', beers: 2 },
    { key: 'S', beers: 3 },
    { key: 'W', beers: 4 },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`${baseColor} w-full aspect-square flex items-center justify-center rounded-lg`}>
        <span className="text-white text-8xl font-bold font-mono">{score}</span>
      </div>
      <div className="w-full">
        <h2 className={`text-center ${textColor} text-2xl font-bold mb-4 truncate`}>
          {team}
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {buttons.map(({ key, beers }) => (
            <button
              key={key}
              onClick={() => onScore(key)}
              className={`${baseColor} text-white py-2 rounded-md hover:opacity-90 transition-opacity relative group`}
            >
              {key}
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs rounded-full w-4 h-4 flex items-center justify-center group-hover:opacity-100 opacity-75">
                {beers}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onBeer}
          className={`${baseColor} text-white px-3 py-1 rounded-md hover:opacity-90 transition-opacity`}
        >
          <Beer className="w-4 h-4" />
        </button>
        <span className={`${textColor} font-mono font-bold`}>{beers}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;