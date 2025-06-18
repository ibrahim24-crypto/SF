
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import BallComponent from './Ball';
import type { BallProps as BallData } from './Ball';
import GameHeader from './GameHeader';
import GameOverOverlay from './GameOverOverlay';
import { Button } from '@/components/ui/button';
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
  const { user, updateUserHighScore } = useAuth();
  const { toast } = useToast();

  const [isClient, setIsClient] = useState(false);
  const [score, setScore] = useState(0);
  const [localHighScore, setLocalHighScore] = useState(0);

  const [livesState, setLivesState] = useState<LifeState[]>([]);
  const [missedBallStreak, setMissedBallStreak] = useState(0);
  const [clickedBallStreak, setClickedBallStreak] = useState(0);
  const [balls, setBalls] = useState<Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive'>[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isBonusAnimating, setIsBonusAnimating] = useState(false);
  const [bonusBallTarget, setBonusBallTarget] = useState<{x: number, y: number} | null>(null);

  const [isInstantExplodeModeActive, setIsInstantExplodeModeActive] = useState(false);
  const [showInstantExplodeBanner, setShowInstantExplodeBanner] = useState(false);
  const [scoreAreaClickCount, setScoreAreaClickCount] = useState(0);


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
    if (showInstantExplodeBanner) {
      const timer = setTimeout(() => {
        setShowInstantExplodeBanner(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showInstantExplodeBanner]);

  const currentOverallHighScore = user?.highScore !== undefined ? Math.max(localHighScore, user.highScore) : localHighScore;

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
            const livesDisplayRect = lastLifeElement.parentElement?.parentElement?.getBoundingClientRect();
            if (livesDisplayRect) {
                const targetX = livesDisplayRect.right + BALL_RADIUS * 0.6 + 8;
                const targetY = livesDisplayRect.top + livesDisplayRect.height / 2;
                setBonusBallTarget({ x: targetX, y: targetY });
            } else {
                 setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
            }
          } else {
            const livesContainer = document.querySelector('.flex.space-x-1.items-center.bg-primary\\/80, .flex.space-x-2.items-center.bg-primary\\/80');
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

    setBalls(prev => prev.filter(b => b.id !== ballId)); // Remove the missed ball immediately

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
                     toast({ title: "New High Score!", description: `Your new high score ${score} is saved online.`});
                  });
                } else {
                   toast({ title: "New Local High Score!", description: `Your new high score is ${score}. Log in to save online!`});
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

  const getBallColor = useCallback((currentScore: number): string => {
    if (currentScore > 500) return 'rainbow-gradient';
    const TIER_SCORE = 30;
    const tier = Math.floor(currentScore / TIER_SCORE);
    const colors = ['#FFFFFF', '#FFFF00', '#90EE90', '#ADD8E6', '#FFC0CB', '#E6E6FA', '#FFA500'];
    return colors[tier % colors.length] || '#FFFFFF';
  }, []);

  const generateBall = useCallback(() => {
    if (!gameAreaRef.current || !isClient || gameOver) return;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    if (gameAreaWidth === 0) return;

    const newBallData: Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive'> = {
      id: `ball-${Date.now()}-${Math.random()}`,
      x: Math.random() * (100 - (BALL_RADIUS * 2 * 100 / gameAreaWidth)) + (BALL_RADIUS * 100 / gameAreaWidth),
      y: -BALL_RADIUS,
      radius: BALL_RADIUS,
      color: getBallColor(score),
      isExploding: false,
    };
    setBalls((prevBalls) => [...prevBalls, newBallData]);
  }, [score, getBallColor, isClient, gameOver, setBalls]);


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
              if (!explodingInProgressRef.current.has(ball.id)) { // Check if not already being handled by click
                handleBallMiss(ball.id);
              }
              return null;
            }
            return { ...ball, y: newY };
          }).filter(Boolean) as Omit<BallData, 'onBallClick' | 'isInstantExplodeModeActive'>[]
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
    setScoreAreaClickCount(0); // Reset secret click count
    setBalls([]);
    setGameOver(false);
    explodingInProgressRef.current.clear();

    const storedLocalHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    let newLocalHighScore = 0;
    if (storedLocalHighScore) {
      newLocalHighScore = parseInt(storedLocalHighScore, 10);
    }
    setLocalHighScore(newLocalHighScore);

    const instantMode = Math.random() < 0.1; // 10% chance for random activation
    setIsInstantExplodeModeActive(instantMode);
    if (instantMode) {
      setShowInstantExplodeBanner(true);
      toast({ title: "⚡ Instant Explode Mode Active! ⚡", description: "Hover or tap balls to pop them instantly!", duration: 5000 });
    } else {
      setShowInstantExplodeBanner(false); // Ensure banner is hidden if not active
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
    if (!gameStarted || gameOver || isInstantExplodeModeActive) return;

    const currentNonExplodingLives = livesState.filter(l => !l.exploding).length;

    if (currentNonExplodingLives === 1) {
      setScoreAreaClickCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount >= SECRET_CLICK_TARGET) {
          setIsInstantExplodeModeActive(true);
          setShowInstantExplodeBanner(true);
          toast({ title: "🤫 Secret Activated!", description: "Instant Explode Mode is ON!", duration: 5000 });
          return 0; // Reset count
        }
        return newCount;
      });
    } else {
      setScoreAreaClickCount(0); // Reset if not at 1 life
    }
  }, [gameStarted, gameOver, isInstantExplodeModeActive, livesState, toast, setIsInstantExplodeModeActive, setShowInstantExplodeBanner, setScoreAreaClickCount]);


  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <p className="text-2xl text-primary font-semibold">Loading Game...</p>
          <p className="text-foreground/80">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <h1 className="text-5xl font-headline text-primary mb-4">Skyfall Boomer</h1>
        <p className="text-xl text-foreground/80 mb-8">High Score: {currentOverallHighScore}</p>
        <Button onClick={startGame} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-2xl py-4 px-8 shadow-lg hover:shadow-xl transition-shadow">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div
      ref={gameAreaRef}
      className={cn(
        "relative w-screen h-screen overflow-hidden bg-background select-none",
        isInstantExplodeModeActive && "cursor-crosshair"
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
          isInstantExplodeModeActive={isInstantExplodeModeActive}
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

      {showInstantExplodeBanner && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-xl z-[60] text-center transition-opacity duration-500 opacity-100 animate-pulse">
          <p className="text-md sm:text-lg font-semibold">⚡ Instant Explode Mode Active! ⚡</p>
          <p className="text-xs sm:text-sm">Hover or tap balls to pop them instantly!</p>
        </div>
      )}


      {gameOver && <GameOverOverlay score={score} highScore={currentOverallHighScore} onRestart={restartGame} />}
    </div>
  );
};

export default GameScreen;
