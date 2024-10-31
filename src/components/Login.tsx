import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { Beer } from 'lucide-react';

interface LoginProps {
  onLogin: (teams: { team1: string; team2: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (team1 && team2) {
      onLogin({ team1, team2 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Beer className="w-12 h-12 text-yellow-400" />
          <h1 className="text-3xl font-bold ml-2">Beer Counter</h1>
        </div>

        {!isLoggedIn ? (
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team 1 Name
              </label>
              <input
                type="text"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Team 2 Name
              </label>
              <input
                type="text"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-bold"
            >
              Start Game
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;