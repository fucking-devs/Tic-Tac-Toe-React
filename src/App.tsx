import React from 'react';
import Game from './Game';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Игра Крестики-Нолики</h1>
      <Game />
    </div>
  );
};

export default App;
