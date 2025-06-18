import React from 'react';

interface ScoreDisplayProps {
  score: number;
  highScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, highScore }) => {
  return (
    <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-lg shadow-md flex flex-col space-y-1 items-start">
      <h2 className="text-2xl font-headline font-semibold">Score: {score}</h2>
      <h3 className="text-lg font-headline font-medium text-primary-foreground/90">High Score: {highScore}</h3>
    </div>
  );
};

export default ScoreDisplay;
