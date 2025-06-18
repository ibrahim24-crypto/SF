
import React from 'react';
import ScoreDisplay from './ScoreDisplay';
import LivesDisplay from './LivesDisplay';
import type { BallProps as BallData } from './Ball'; // Assuming BallData might be needed for future prop consistency

interface LifeState {
  id: string;
  exploding: boolean;
}

interface GameHeaderProps {
  score: number;
  highScore: number;
  livesState: LifeState[];
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, highScore, livesState }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-start justify-between p-4">
      <ScoreDisplay score={score} highScore={highScore} />
      <LivesDisplay livesState={livesState} />
    </header>
  );
};

export default GameHeader;
