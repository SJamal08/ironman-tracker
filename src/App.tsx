import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-400">
      <h1 className="text-5xl font-bold text-blue-200">Tailwind 4 fonctionne 🎉</h1>
      <p className="mt-4 text-gray-700 text-lg">Bienvenue sur Ironman Tracker</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        Tester un bouton
      </button>
    </div>
  );
}

export default App;
