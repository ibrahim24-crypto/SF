
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
  highScore: number; // This will now be the local/overall high score
  livesState: LifeState[];
}

const GameHeader: React.FC<GameHeaderProps> = ({ score, highScore, livesState }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, loading, logOut } = useAuth();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determine the high score to display: user's Firebase high score if logged in, otherwise local high score
  const displayHighScore = user?.highScore !== undefined ? Math.max(highScore, user.highScore) : highScore;

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-4">
      <div className="flex items-center justify-between w-full mb-1">
        <div className="flex items-center space-x-2">
          {loading ? (
            <div className="h-8 w-24 bg-muted rounded-md animate-pulse"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1 h-auto text-primary-foreground hover:bg-primary/70">
                  <div className="flex items-center space-x-2">
                    {user.photoURL ? (
                      <Image src={user.photoURL} alt={user.username || "User"} width={28} height={28} className="rounded-full" />
                    ) : (
                      <UserIcon className="h-7 w-7 p-0.5 rounded-full bg-primary/50" />
                    )}
                    <span className="font-medium hidden sm:inline">{user.username || 'Profile'}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>{user.username || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/profile" passHref><DropdownMenuItem>View Profile</DropdownMenuItem></Link>
                <Link href="/leaderboard" passHref><DropdownMenuItem>Leaderboard</DropdownMenuItem></Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" passHref>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary/70">
                <LogIn className="mr-2 h-5 w-5" /> Login
              </Button>
            </Link>
          )}
        </div>

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
        <ScoreDisplay score={score} highScore={displayHighScore} />
        <LivesDisplay livesState={livesState} />
      </div>
    </header>
  );
};

export default GameHeader;
