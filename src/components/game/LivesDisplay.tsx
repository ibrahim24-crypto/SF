
import React from 'react';

interface LivesDisplayProps {
  livesState: Array<{ id: string, exploding: boolean }>;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ livesState }) => {
  return (
    <div className="flex flex-wrap gap-1 sm:gap-2 items-center p-0"> 
      <span className="text-lg sm:text-2xl font-headline font-semibold text-foreground mr-1 sm:mr-2">Lives:</span>
      {livesState.map((life) => (
        <div
          key={life.id}
          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-inner
                      ${life.exploding ? 'life-lost' : 'bg-red-500 border-2 border-red-700/80'}`}
          aria-label={life.exploding ? "Life lost" : "Life remaining"}
        >
        </div>
      ))}
    </div>
  );
};

export default LivesDisplay;
