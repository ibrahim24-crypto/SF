import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Crown, RotateCcw } from 'lucide-react';

interface GameOverOverlayProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center shadow-2xl bg-card/90 backdrop-blur-md border border-border/50 rounded-xl p-2">
        <CardHeader className="p-6">
          <CardTitle className="text-4xl sm:text-5xl font-bold text-gradient-purple-pink tracking-tight">Game Over!</CardTitle>
          <CardDescription className="text-md sm:text-lg text-muted-foreground mt-2">
            You put up a good fight!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <p className="text-2xl sm:text-3xl font-semibold text-foreground">Final Score: <span className="text-accent font-bold">{score}</span></p>
          <p className="text-lg sm:text-xl font-medium text-muted-foreground mt-3">High Score: <span className="text-primary/90 font-semibold">{highScore}</span></p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 p-6 pt-4">
          <Button 
            onClick={onRestart} 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-md sm:text-lg py-3 px-6 w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            <RotateCcw className="mr-2 h-5 w-5"/> Restart Game
          </Button>
          <Link href="/leaderboard" passHref>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-md sm:text-lg py-3 px-6 w-full sm:w-auto bg-input/50 hover:bg-input/70 text-foreground border-border/70 hover:border-primary/50"
            >
              <Crown className="mr-2 h-5 w-5"/> View Leaderboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverOverlay;