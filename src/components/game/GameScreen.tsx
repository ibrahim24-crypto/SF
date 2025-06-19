
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import BallComponent from './Ball';
import type { BallProps as BallData } from './Ball';
import GameHeader from './GameHeader';
import GameOverOverlay from './GameOverOverlay';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Zap, ZapOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const INITIAL_LIVES = 5;
const BALL_RADIUS = 20;
const BALL_FALL_SPEED = 2;
const BALL_GENERATION_INTERVAL = 1500;
const MISSED_BALLS_PER_LIFE_LOSS = 5;
const CLICKED_BALLS_PER_LIFE_GAIN = 30;
const EXPLOSION_DURATION = 300;
const HIGH_SCORE_KEY = 'skyfallBoomerLocalHighScore';
const SECRET_CLICK_TARGET = 10;


interface LifeState {
  id: string;
  exploding: boolean;
}

const GameScreen: React.FC = () => {
  const { user, updateUserHighScore, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);
  const [score, setScore] = useState(0);
  const [localHighScore, setLocalHighScore] = useState(0);

  const [livesState, setLivesState] = useState<LifeState[]>([]);
  const [missedBallStreak, setMissedBallStreak] = useState(0);
  const [clickedBallStreak, setClickedBallStreak] = useState(0);
  const [balls, setBalls] = useState<Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive' | 'ballPulseTrigger'>[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isBonusAnimating, setIsBonusAnimating] = useState(false);
  const [bonusBallTarget, setBonusBallTarget] = useState<{x: number, y: number} | null>(null);

  const [isInstantExplodeModeActive, setIsInstantExplodeModeActive] = useState(false);
  const [instantExplodeUserPreference, setInstantExplodeUserPreference] = useState(true);
  const [showInstantExplodeBanner, setShowInstantExplodeBanner] = useState(false);
  const [scoreAreaClickCount, setScoreAreaClickCount] = useState(0);
  const [ballPulseAnimationTrigger, setBallPulseAnimationTrigger] = useState(0);


  const gameAreaRef = useRef<HTMLDivElement>(null);
  const explodingInProgressRef = useRef<Set<string>>(new Set());


  useEffect(() => {
    setIsClient(true);
    const storedLocalHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedLocalHighScore) {
      setLocalHighScore(parseInt(storedLocalHighScore, 10));
    } else {
      setLocalHighScore(0);
    }
    initializeLives(INITIAL_LIVES);
  }, []);

  useEffect(() => {
    if (showInstantExplodeBanner && instantExplodeUserPreference) {
      const timer = setTimeout(() => {
        setShowInstantExplodeBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstantExplodeBanner, instantExplodeUserPreference]);

  useEffect(() => {
    if (!authLoading && !user) { // User logged out
      setGameStarted(false); // Go back to start screen
      setIsInstantExplodeModeActive(false);
      setInstantExplodeUserPreference(true);
      setShowInstantExplodeBanner(false);
      setScoreAreaClickCount(0);
    }
  }, [user, authLoading]);


  const currentOverallHighScore = user?.highScore !== undefined ? Math.max(localHighScore, user.highScore) : localHighScore;
  const effectiveInstantExplodeMode = isInstantExplodeModeActive && instantExplodeUserPreference;

  const initializeLives = (numLives: number) => {
    setLivesState(Array.from({ length: numLives }, (_, i) => ({ id: `life-${i}-${Date.now()}`, exploding: false })));
  };

  const handleBallClick = useCallback((ballId: string) => {
    if (gameOver || explodingInProgressRef.current.has(ballId)) {
      return;
    }

    const ballToExplode = balls.find(b => b.id === ballId && !b.isExploding);
    if (!ballToExplode) {
      return;
    }

    explodingInProgressRef.current.add(ballId);

    setBalls((prevBalls) =>
      prevBalls.map((b) => (b.id === ballId ? { ...b, isExploding: true } : b))
    );

    setTimeout(() => {
      setBalls(prev => prev.filter(b => b.id !== ballId));
      explodingInProgressRef.current.delete(ballId);
    }, EXPLOSION_DURATION);

    setScore((s) => s + 1);
    setClickedBallStreak((cbs) => {
      const newStreak = cbs + 1;
      if (newStreak > 0 && newStreak % CLICKED_BALLS_PER_LIFE_GAIN === 0) {
        setLivesState(prevLives => {
          if (prevLives.filter(l => !l.exploding).length >= INITIAL_LIVES * 2) return prevLives;

          const newLifeId = `life-${prevLives.length}-${Date.now()}`;
          const livesElements = document.querySelectorAll('[aria-label="Life remaining"]');
          const lastLifeElement = livesElements[livesElements.length -1];

          if (lastLifeElement) {
            const livesDisplayRect = lastLifeElement.parentElement?.getBoundingClientRect();
            if (livesDisplayRect) {
                const targetX = livesDisplayRect.right + BALL_RADIUS * 0.6 + 8;
                const targetY = livesDisplayRect.top + livesDisplayRect.height / 2;
                setBonusBallTarget({ x: targetX, y: targetY });
            } else {
                 setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
            }
          } else {
            const livesContainer = gameAreaRef.current?.querySelector('.flex.items-start.justify-between .flex.flex-wrap');
            if(livesContainer) {
                const rect = livesContainer.getBoundingClientRect();
                const targetX = rect.left + BALL_RADIUS * 0.6;
                const targetY = rect.top + rect.height / 2;
                setBonusBallTarget({ x: targetX, y: targetY });
            } else {
                setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
            }
          }

          setIsBonusAnimating(true);
          setTimeout(() => {
            setLivesState(prev => [...prev, { id: newLifeId, exploding: false }]);
            setIsBonusAnimating(false);
            setBonusBallTarget(null);
          }, 700);
          return prevLives;
        });
        return 0;
      }
      return newStreak;
    });
  }, [gameOver, balls, setBalls, setScore, setClickedBallStreak, setLivesState, setIsBonusAnimating, setBonusBallTarget]);


  const handleBallMiss = useCallback((ballId: string) => {
    if (gameOver || explodingInProgressRef.current.has(ballId)) return;

    setBalls(prev => prev.filter(b => b.id !== ballId));

    setMissedBallStreak((currentStreakMbs) => {
      const newCalculatedStreak = currentStreakMbs + 1;
      const conditionMet = newCalculatedStreak > 0 && newCalculatedStreak % MISSED_BALLS_PER_LIFE_LOSS === 0;

      if (conditionMet) {
        setLivesState(prevLives => {
          const firstNonExplodingLifeIndex = prevLives.findIndex(l => !l.exploding);
          if (firstNonExplodingLifeIndex !== -1) {
            const updatedLives = [...prevLives];
            updatedLives[firstNonExplodingLifeIndex] = { ...updatedLives[firstNonExplodingLifeIndex], exploding: true };

            const remainingLives = updatedLives.filter(l => !l.exploding).length;
            if (remainingLives === 0) {
              if (score > currentOverallHighScore) {
                setLocalHighScore(score);
                localStorage.setItem(HIGH_SCORE_KEY, score.toString());
                if (user) {
                  updateUserHighScore(score).then(() => {
                    setTimeout(() => {
                      toast({ title: "New High Score!", description: `Your new high score ${score} is saved online.`, className: "bg-accent text-accent-foreground border-accent" });
                    },0);
                  });
                } else {
                   setTimeout(() => {
                     toast({ title: "New Local High Score!", description: `Your new high score is ${score}. Log in to save online!`, className: "bg-primary text-primary-foreground border-primary" });
                   },0);
                }
              }
              setGameOver(true);
            }
            return updatedLives;
          }
          return prevLives;
        });
        return 0;
      } else {
        return newCalculatedStreak;
      }
    });
  }, [gameOver, score, currentOverallHighScore, user, updateUserHighScore, toast, setLivesState, setMissedBallStreak, setLocalHighScore, setGameOver, setBalls]);

  const getBallColor = useCallback((): string => {
    if (score > 500) return 'rainbow-gradient';
    return 'hsl(0 0% 100%)'; // White
  }, [score]);

  const generateBall = useCallback(() => {
    if (!gameAreaRef.current || !isClient || gameOver) return;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    if (gameAreaWidth === 0) return;

    const newBallData: Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive' | 'ballPulseTrigger'> = {
      id: `ball-${Date.now()}-${Math.random()}`,
      x: Math.random() * (100 - (BALL_RADIUS * 2 * 100 / gameAreaWidth)) + (BALL_RADIUS * 100 / gameAreaWidth),
      y: -BALL_RADIUS,
      radius: BALL_RADIUS,
      color: getBallColor(),
      isExploding: false,
    };
    setBalls((prevBalls) => [...prevBalls, newBallData]);
  }, [getBallColor, isClient, gameOver, setBalls, score]);


  useEffect(() => {
    if (!gameStarted || gameOver || !isClient) return;
    const intervalId = setInterval(generateBall, BALL_GENERATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, generateBall, isClient]);

  useEffect(() => {
    if (!gameStarted || gameOver || !isClient) return;
    let animationFrameId: number;

    const gameLoop = () => {
      if (!gameAreaRef.current) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }
      const gameAreaHeight = gameAreaRef.current.offsetHeight;
       if (gameAreaHeight <= 0) {
          animationFrameId = requestAnimationFrame(gameLoop);
          return;
      }

      setBalls((prevBalls) =>
        prevBalls
          .map((ball) => {
            if (ball.isExploding) return ball;
            const newY = ball.y + BALL_FALL_SPEED;
            if (newY > gameAreaHeight + ball.radius) {
              if (!explodingInProgressRef.current.has(ball.id)) {
                 handleBallMiss(ball.id);
              }
              return null;
            }
            return { ...ball, y: newY };
          }).filter(Boolean) as Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive' | 'ballPulseTrigger'>[]
      );
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, gameOver, isClient, handleBallMiss, setBalls]);


  const commonGameReset = () => {
    setScore(0);
    initializeLives(INITIAL_LIVES);
    setMissedBallStreak(0);
    setClickedBallStreak(0);
    setScoreAreaClickCount(0);
    setBallPulseAnimationTrigger(0);
    setBalls([]);
    setGameOver(false);
    explodingInProgressRef.current.clear();

    const storedLocalHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    let newLocalHighScore = 0;
    if (storedLocalHighScore) {
      newLocalHighScore = parseInt(storedLocalHighScore, 10);
    }
    setLocalHighScore(newLocalHighScore);

    const instantModeActivatedRandomly = Math.random() < 0.1;
    setIsInstantExplodeModeActive(instantModeActivatedRandomly);
    setInstantExplodeUserPreference(true);
    if (instantModeActivatedRandomly) {
      setShowInstantExplodeBanner(true);
      setTimeout(() => {
          toast({ title: "⚡ Instant Explode Mode Active! ⚡", description: "Hover or tap balls to pop them instantly!", duration: 5000, className: "bg-primary text-primary-foreground border-primary" });
      }, 0);
    } else {
      setShowInstantExplodeBanner(false);
    }
  };

  const restartGame = () => {
    commonGameReset();
    setGameStarted(true);
  };

  const startGame = () => {
    commonGameReset();
    setGameStarted(true);
  };

  const handleScoreAreaClick = useCallback(() => {
    if (!gameStarted || gameOver) return;

    setBallPulseAnimationTrigger(prev => prev + 1);

    if (isInstantExplodeModeActive) return; // Don't allow re-triggering if already active via any means

    setScoreAreaClickCount(prevCount => {
      const newCount = prevCount + 1;
      if (newCount >= SECRET_CLICK_TARGET) {
        setIsInstantExplodeModeActive(true);
        setInstantExplodeUserPreference(true); // Also enable user preference by default
        setShowInstantExplodeBanner(true);
        setTimeout(() => {
            toast({ title: "🤫 Secret Activated!", description: "Instant Explode Mode is ON!", duration: 5000, className: "bg-accent text-accent-foreground border-accent" });
        }, 0);
        return 0;
      }
      return newCount;
    });
  }, [gameStarted, gameOver, isInstantExplodeModeActive, toast, setIsInstantExplodeModeActive, setInstantExplodeUserPreference, setShowInstantExplodeBanner, setScoreAreaClickCount, setBallPulseAnimationTrigger]);


  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-game-screen">
        <div className="text-center">
          <p className="text-2xl text-primary font-semibold">Loading Game...</p>
          <p className="text-foreground/80">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-game-screen">
        <h1 className="text-6xl sm:text-7xl font-headline text-gradient-theme mb-4 tracking-tight font-bold">Skyfall Boomer</h1>
        <p className="text-xl text-foreground/80 mb-8">High Score: <span className="font-semibold text-accent">{currentOverallHighScore}</span></p>
        <Button
          onClick={startGame}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-2xl py-4 px-8 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
        >
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={gameAreaRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden select-none bg-game-screen",
        effectiveInstantExplodeMode && "cursor-crosshair"
      )}
      aria-label="Game Area"
    >
      <GameHeader
        score={score}
        highScore={currentOverallHighScore}
        livesState={livesState}
        onScoreAreaClick={handleScoreAreaClick}
      />

      {balls.map((ball) => (
        <BallComponent
          key={ball.id}
          {...ball}
          onBallClick={handleBallClick}
          isInstantExplodeModeActive={effectiveInstantExplodeMode}
          ballPulseTrigger={ballPulseAnimationTrigger}
        />
      ))}

      {isBonusAnimating && bonusBallTarget && (
        <div
          className="fixed rounded-full bg-accent z-[100]"
          style={{
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            left: '50vw',
            top: '50vh',
            transform: 'translate(-50%, -50%)',
            animationName: 'big-ball-bonus-animation',
            animationDuration: '0.7s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            '--target-x': `${bonusBallTarget.x}px`,
            '--target-y': `${bonusBallTarget.y}px`,
          } as React.CSSProperties}
        />
      )}

      {isInstantExplodeModeActive && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[60] bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-border flex items-center space-x-3">
          <Label htmlFor="instant-explode-toggle" className="flex items-center space-x-2 cursor-pointer text-sm font-medium text-card-foreground">
            {instantExplodeUserPreference ? <Zap className="h-5 w-5 text-accent" /> : <ZapOff className="h-5 w-5 text-muted-foreground" />}
            <span>Instant Explode</span>
          </Label>
          <Switch
            id="instant-explode-toggle"
            checked={instantExplodeUserPreference}
            onCheckedChange={setInstantExplodeUserPreference}
            aria-label="Toggle Instant Explode Mode"
            className="data-[state=checked]:bg-accent data-[state=unchecked]:bg-muted"
          />
        </div>
      )}

      {showInstantExplodeBanner && instantExplodeUserPreference && (
         <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 bg-primary/95 backdrop-blur-sm text-primary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-xl z-[60] text-center transition-opacity duration-500 opacity-100 animate-pulse border border-primary">
          <p className="text-md sm:text-lg font-semibold">⚡ Instant Explode Mode Active! ⚡</p>
          <p className="text-xs sm:text-sm">Hover or tap balls to pop them instantly!</p>
        </div>
      )}


      {gameOver && <GameOverOverlay score={score} highScore={currentOverallHighScore} onRestart={restartGame} />}
    </div>
  );
};

export default GameScreen;
