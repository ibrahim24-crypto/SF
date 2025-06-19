
import React from 'react';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
  onScoreAreaClick?: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, highScore, onScoreAreaClick }) => {
  return (
    <div
      className="text-primary-foreground p-0 flex flex-col items-start select-none" // Removed bg, padding is on GameHeader container
      onClick={onScoreAreaClick}
      style={{ cursor: onScoreAreaClick ? 'default' : 'auto' }}
      aria-label="Score and high score display"
    >
      <h2 className="text-lg sm:text-2xl font-headline font-semibold">Score: {score}</h2>
      <h3 className="text-sm sm:text-lg font-headline font-medium text-primary-foreground/90">High Score: {highScore}</h3>
    </div>
  );
};

export default ScoreDisplay;
