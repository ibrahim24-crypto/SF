import React from 'react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  return (
    <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-lg shadow-md">
      <h2 className="text-2xl font-headline font-semibold">Score: {score}</h2>
    </div>
  );
};

export default ScoreDisplay;
