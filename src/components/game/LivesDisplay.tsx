
import React from 'react';

interface LivesDisplayProps {
  livesState: Array<{ id: string, exploding: boolean }>;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ livesState }) => {
  return (
    <div className="flex space-x-1 sm:space-x-2 items-center bg-primary/80 p-2 sm:p-3 rounded-lg shadow-md">
      <span className="text-lg sm:text-2xl font-headline font-semibold text-primary-foreground mr-1 sm:mr-2">Lives:</span>
      {livesState.map((life) => (
        <div
          key={life.id}
          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-inner 
                      ${life.exploding ? 'life-lost' : 'bg-red-500 border-2 border-red-700'}`}
          aria-label={life.exploding ? "Life lost" : "Life remaining"}
        >
          {/* No icon needed if it's just a red ball, explosion handles visual change */}
        </div>
      ))}
    </div>
  );
};

export default LivesDisplay;
