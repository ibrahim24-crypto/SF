
import React, { useState } from 'react';
import ScoreDisplay from './ScoreDisplay';
import LivesDisplay from './LivesDisplay';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, User as UserIcon, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';

interface LifeState {
  id: string;
  exploding: boolean;
}

interface GameHeaderProps {
  score: number;
  highScore: number;
  livesState: LifeState[];
  onScoreAreaClick?: () => void;
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, highScore, livesState, onScoreAreaClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading, logOut } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const displayHighScore = user?.highScore !== undefined ? Math.max(highScore, user.highScore) : highScore;

  const headerBackgroundColor = "bg-background/30 backdrop-blur-sm"; // Dark, slightly transparent
  const textColorClass = "text-foreground"; // Light text for dark background
  const hoverBgClass = "hover:bg-secondary/50"; // Hover for buttons

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-2 sm:p-4">
      <div className="flex items-center justify-between w-full mb-0.5 sm:mb-1">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {loading ? (
            <div className="h-8 w-24 bg-muted/50 rounded-md animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={cn("p-1 h-auto", textColorClass, hoverBgClass)}>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.username || "User"} width={28} height={28} className="rounded-full w-6 h-6 sm:w-7 sm:h-7 border border-foreground/30" />
                    ) : (
                      <UserIcon className={cn("h-6 w-6 sm:h-7 sm:h-7 p-0.5 rounded-full bg-secondary/30", textColorClass)} />
                    )}
                    <span className={cn("font-medium text-sm sm:text-base hidden sm:inline", textColorClass)}>{user.username || 'Profile'}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card text-card-foreground border-border">
                <DropdownMenuLabel>{user.username || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref><DropdownMenuItem>View Profile</DropdownMenuItem></Link>
                <Link href="/leaderboard" passHref><DropdownMenuItem>Leaderboard</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="text-destructive focus:text-destructive focus:bg-destructive/20">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className={cn("text-sm sm:text-base px-2 sm:px-3", textColorClass, hoverBgClass)}>
                <LogIn className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Login
              </Button>
            </Link>
          )}
        </div>

        <Button
          onClick={toggleCollapse}
          variant="ghost"
          size="icon"
          className={cn("p-1 rounded-md h-7 w-7 sm:h-8 sm:w-8", textColorClass, hoverBgClass, "active:bg-secondary/40")}
          aria-label={isCollapsed ? "Show game details" : "Hide game details"}
          aria-expanded={!isCollapsed}
        >
          {isCollapsed ? <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" /> : <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
      </div>
      <div
        className={cn(
          "flex items-start justify-between w-full overflow-hidden transition-all duration-300 ease-in-out p-2 sm:p-3 rounded-lg shadow-md",
          headerBackgroundColor, // Apply dark, transparent background here
          isCollapsed ? "max-h-0 opacity-0 !p-0" : "max-h-48 opacity-100 mt-0.5 sm:mt-1"
        )}
        aria-hidden={isCollapsed}
      >
        <ScoreDisplay score={score} highScore={displayHighScore} onScoreAreaClick={onScoreAreaClick} />
        <LivesDisplay livesState={livesState} />
      </div>
    </header>
  );
};

export default GameHeader;
