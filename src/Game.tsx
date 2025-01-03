import React, { useEffect, useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [history, setHistory] = useState<(string | null)[]>(() => {
    const savedSquares = localStorage.getItem('squares');
    return savedSquares ? JSON.parse(savedSquares) : Array(9).fill(null);
  });
  const [xIsNext, setXIsNext] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem('squares', JSON.stringify(history));
  }, [history]);

  const handlePlay = (nextSquares: (string | null)[]) => {
    setHistory(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(history);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <Board xIsNext={xIsNext} squares={history} onPlay={handlePlay} />
      <div className="game-info">{status}</div>
      <button onClick={() => {
        setHistory(Array(9).fill(null));
        setXIsNext(true);
        localStorage.removeItem('squares'); 
      }}>
        Restart Game
      </button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
