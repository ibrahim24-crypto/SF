
import React, { useState } from 'react';
import ScoreDisplay from './ScoreDisplay';
import LivesDisplay from './LivesDisplay';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex items-center justify-end w-full mb-1">
        <Button
          onClick={toggleCollapse}
          variant="ghost"
          size="icon"
          className="text-primary-foreground hover:bg-primary/70 active:bg-primary/60 p-1 rounded-md"
          aria-label={isCollapsed ? "Show game details" : "Hide game details"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronDown className="h-6 w-6" /> : <ChevronUp className="h-6 w-6" />}
        </Button>
      </div>
      <div
        className={cn(
          "flex items-start justify-between w-full overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "max-h-0 opacity-0" : "max-h-48 opacity-100 mt-1" 
        )}
        aria-hidden={isCollapsed}
      >
        <ScoreDisplay score={score} highScore={highScore} />
        <LivesDisplay livesState={livesState} />
      </div>
    </header>
  );
};

export default GameHeader;

    