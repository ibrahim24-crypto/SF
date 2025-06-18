import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface GameOverOverlayProps {
  score: number;
  onRestart: () => void;
}

const GameOverOverlay: React.FC<GameOverOverlayProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
      <Card className="w-full max-w-md text-center shadow-2xl bg-background/90">
        <CardHeader>
          <CardTitle className="text-4xl font-headline text-primary">Game Over!</CardTitle>
          <CardDescription className="text-lg text-foreground/80">
            You did great!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">Final Score: <span className="text-accent">{score}</span></p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onRestart} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-3 px-6">
            Restart Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameOverOverlay;
