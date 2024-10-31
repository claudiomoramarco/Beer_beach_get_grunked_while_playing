import React, { useState } from 'react';
import { Beer, Timer } from 'lucide-react';
import ScoreBoard from './components/ScoreBoard';
import GameTimer from './components/GameTimer';
import Login from './components/Login';

interface TeamNames {
  team1: string;
  team2: string;
}

function App() {
  const [teamNames, setTeamNames] = useState<TeamNames | null>(null);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [beers, setBeers] = useState({ team1: 0, team2: 0 });
  
  const handleScore = (team: 'team1' | 'team2', button: string) => {
    const beerCounts = {
      'N': 1,
      'B': 2,
      'S': 3,
      'W': 4
    };

    setScores(prev => ({
      ...prev,
      [team]: prev[team] + 1
    }));

    setBeers(prev => ({
      ...prev,
      [team]: prev[team] + beerCounts[button as keyof typeof beerCounts]
    }));
  };

  const handleBeer = (team: 'team1' | 'team2') => {
    setBeers(prev => ({
      ...prev,
      [team]: prev[team] + 1
    }));
  };

  const handleReset = () => {
    setScores({ team1: 0, team2: 0 });
    setBeers({ team1: 0, team2: 0 });
  };

  const handleLogin = (teams: TeamNames) => {
    setTeamNames(teams);
  };

  if (!teamNames) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <ScoreBoard 
            team={teamNames.team1}
            score={scores.team1}
            beers={beers.team1}
            color="emerald"
            onScore={(button) => handleScore('team1', button)}
            onBeer={() => handleBeer('team1')}
          />
          <ScoreBoard 
            team={teamNames.team2}
            score={scores.team2}
            beers={beers.team2}
            color="blue"
            onScore={(button) => handleScore('team2', button)}
            onBeer={() => handleBeer('team2')}
          />
        </div>
        <GameTimer onReset={handleReset} />
      </div>
    </div>
  );
}

export default App;