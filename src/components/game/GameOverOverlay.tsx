
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

interface GameOverOverlayProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md text-center shadow-2xl bg-background/90">
        <CardHeader>
          <CardTitle className="text-4xl font-headline text-primary">Game Over!</CardTitle>
          <CardDescription className="text-lg text-foreground/80">
            You did great!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">Final Score: <span className="text-accent">{score}</span></p>
          <p className="text-xl font-medium text-foreground/80 mt-2">High Score: <span className="text-accent/90">{highScore}</span></p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-2">
          <Button onClick={onRestart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-3 px-6 w-full sm:w-auto">
            Restart Game
          </Button>
          <Link href="/leaderboard" passHref>
            <Button variant="outline" size="lg" className="text-lg py-3 px-6 w-full sm:w-auto">
              View Leaderboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverOverlay;
