import React from 'react';
import { Heart } from 'lucide-react'; // Using Heart as a placeholder for "big ball" icon

interface LivesDisplayProps {
  lives: number;
  livesState: Array<{ id: string, exploding: boolean }>;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ livesState }) => {
  return (
    <div className="absolute top-4 right-4 flex space-x-2 items-center bg-primary/80 p-3 rounded-lg shadow-md">
      <span className="text-2xl font-headline font-semibold text-primary-foreground mr-2">Lives:</span>
      {livesState.map((life) => (
        <div
          key={life.id}
          className={`w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-inner ${life.exploding ? 'life-lost' : ''}`}
          aria-label="Life"
        >
          {!life.exploding && <Heart size={20} className="text-accent-foreground" />}
        </div>
      ))}
    </div>
  );
};

export default LivesDisplay;
