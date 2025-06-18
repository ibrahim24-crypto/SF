
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import BallComponent, { type BallProps as BallData } from './Ball';
import ScoreDisplay from './ScoreDisplay';
import LivesDisplay from './LivesDisplay';
import GameOverOverlay from './GameOverOverlay';
import { Button } from '@/components/ui/button'; // For a potential start button

const INITIAL_LIVES = 3;
const BALL_RADIUS = 20;
const BALL_FALL_SPEED = 2; // Pixels per frame (approx)
const BALL_GENERATION_INTERVAL = 1500; // Milliseconds
const MISSED_BALLS_PER_LIFE_LOSS = 5;
const CLICKED_BALLS_PER_LIFE_GAIN = 50;
const EXPLOSION_DURATION = 300; // Milliseconds, should match CSS animation
const HIGH_SCORE_KEY = 'skyfallBoomerHighScore';

interface LifeState {
  id: string;
  exploding: boolean;
}

const GameScreen: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [livesState, setLivesState] = useState<LifeState[]>([]);
  const [missedBallStreak, setMissedBallStreak] = useState(0);
  const [clickedBallStreak, setClickedBallStreak] = useState(0);
  const [balls, setBalls] = useState<BallData[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isBonusAnimating, setIsBonusAnimating] = useState(false);
  const [bonusBallTarget, setBonusBallTarget] = useState<{x: number, y: number} | null>(null);

  const gameAreaRef = useRef<HTMLDivElement>(null);
  const livesDisplayRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    setIsClient(true);
    initializeLives(INITIAL_LIVES);
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      console.log(`Loaded high score from localStorage: ${storedHighScore}`);
      setHighScore(parseInt(storedHighScore, 10));
    } else {
      console.log("No high score found in localStorage. Initializing to 0.");
      setHighScore(0); 
    }
  }, []);
  
  const initializeLives = (numLives: number) => {
    setLivesState(Array.from({ length: numLives }, (_, i) => ({ id: `life-${i}-${Date.now()}`, exploding: false })));
  };

  const handleBallClick = useCallback((ballId: string) => {
    if (gameOver) return;
    setBalls((prevBalls) =>
      prevBalls.map((b) => (b.id === ballId ? { ...b, isExploding: true } : b))
    );
    setTimeout(() => setBalls(prev => prev.filter(b => b.id !== ballId)), EXPLOSION_DURATION);

    setScore((s) => s + 1);
    setClickedBallStreak((cbs) => {
      const newStreak = cbs + 1;
      if (newStreak > 0 && newStreak % CLICKED_BALLS_PER_LIFE_GAIN === 0) { // ensure newStreak is not 0
        setLivesState(prevLives => {
          if (prevLives.filter(l => !l.exploding).length >= INITIAL_LIVES * 2) return prevLives; 

          const newLifeId = `life-${prevLives.length}-${Date.now()}`;
          if (livesDisplayRef.current) {
            const livesDisplayRect = livesDisplayRef.current.getBoundingClientRect();
            // Calculate target X based on the current number of non-exploding lives
            const currentVisibleLives = prevLives.filter(l => !l.exploding).length;
            const targetX = livesDisplayRect.left + (currentVisibleLives * (BALL_RADIUS*1.2 + 8)) + BALL_RADIUS *0.6; 
            const targetY = livesDisplayRect.top + BALL_RADIUS *0.6;
            setBonusBallTarget({ x: targetX, y: targetY });
          } else {
             // Fallback if ref is not available, though less accurate
             setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
          }
          setIsBonusAnimating(true);
          setTimeout(() => {
            setLivesState(prev => [...prev, { id: newLifeId, exploding: false }]);
            setIsBonusAnimating(false);
            setBonusBallTarget(null); // Reset target after animation
          }, 700); 
          return prevLives; 
        });
      }
      return newStreak;
    });
  }, [gameOver]);

  const handleBallMiss = useCallback((ballId: string) => {
    if (gameOver) return; 
    
    setTimeout(() => setBalls(prev => prev.filter(b => b.id !== ballId)), EXPLOSION_DURATION);

    setMissedBallStreak((mbs) => {
      const newStreak = mbs + 1;
      if (newStreak > 0 && newStreak % MISSED_BALLS_PER_LIFE_LOSS === 0) { // ensure newStreak is not 0
        setLivesState(prevLives => {
          const firstNonExplodingLifeIndex = prevLives.findIndex(l => !l.exploding);
          if (firstNonExplodingLifeIndex !== -1) {
            const updatedLives = [...prevLives];
            updatedLives[firstNonExplodingLifeIndex] = { ...updatedLives[firstNonExplodingLifeIndex], exploding: true };
            
            const remainingLives = updatedLives.filter(l => !l.exploding).length;
            if (remainingLives === 0) {
              console.log(`Game Over. Score: ${score}, Current High Score: ${highScore}`);
              if (score > highScore) {
                console.log(`New High Score! ${score} > ${highScore}. Saving.`);
                setHighScore(score);
                localStorage.setItem(HIGH_SCORE_KEY, score.toString());
              } else {
                console.log(`Score ${score} did not beat high score ${highScore}.`);
              }
              setGameOver(true);
            }
            return updatedLives;
          }
          return prevLives; 
        });
      }
      return newStreak;
    });
  }, [gameOver, score, highScore]);

  const getBallColor = useCallback((currentScore: number): string => {
    if (currentScore > 500) return 'rainbow-gradient';
    const TIER_SCORE = 30;
    const tier = Math.floor(currentScore / TIER_SCORE);
    const colors = ['#FFFFFF', '#FFFF00', '#90EE90', '#ADD8E6', '#FFC0CB', '#E6E6FA', '#FFA500']; 
    return colors[tier % colors.length] || '#FFFFFF';
  }, []);

  const generateBall = useCallback(() => {
    if (!gameAreaRef.current || !isClient) return;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    if (gameAreaWidth === 0) return; 
    const newBall: BallData = {
      id: `ball-${Date.now()}-${Math.random()}`,
      x: Math.random() * (100 - (BALL_RADIUS * 2 * 100 / gameAreaWidth)) + (BALL_RADIUS * 100 / gameAreaWidth), 
      y: -BALL_RADIUS, 
      radius: BALL_RADIUS,
      color: getBallColor(score),
      onBallClick: handleBallClick, // Now handleBallClick is defined
      isExploding: false,
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  }, [score, getBallColor, isClient, handleBallClick]); // handleBallClick dependency is now safe


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
      if (gameAreaHeight <= 0) { // Check for non-positive height
        animationFrameId = requestAnimationFrame(gameLoop); 
        return;
      }

      setBalls((prevBalls) =>
        prevBalls
          .map((ball) => {
            if (ball.isExploding) return ball; 
            const newY = ball.y + BALL_FALL_SPEED;
            if (newY > gameAreaHeight - ball.radius) { // Adjusted condition slightly
              handleBallMiss(ball.id); 
              return { ...ball, isExploding: true, y: gameAreaHeight - ball.radius }; 
            }
            return { ...ball, y: newY };
          })
      );
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, gameOver, isClient, handleBallMiss]); // handleBallMiss dependency is now safe


  const restartGame = () => {
    setScore(0);
    initializeLives(INITIAL_LIVES);
    setMissedBallStreak(0);
    setClickedBallStreak(0);
    setBalls([]);
    setGameOver(false);
    setGameStarted(true);
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      const numStoredHighScore = parseInt(storedHighScore, 10);
      console.log(`Restarting game. Loaded high score from localStorage: ${numStoredHighScore}`);
      if (numStoredHighScore !== highScore) { 
         setHighScore(numStoredHighScore);
      }
    } else {
      console.log("Restarting game. No high score in localStorage, ensuring it's 0.");
      setHighScore(0); // Ensure high score is 0 if nothing is stored
    }
  };

  const startGame = () => {
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      const numStoredHighScore = parseInt(storedHighScore, 10);
       console.log(`Starting game. Loaded high score from localStorage: ${numStoredHighScore}`);
      if (numStoredHighScore !== highScore) {
         setHighScore(numStoredHighScore);
      }
    } else if (highScore !== 0) { 
        console.log(`Starting game. No stored high score, resetting highScore state from ${highScore} to 0.`);
        setHighScore(0);
    }
    setGameStarted(true); 
    // restartGame will be called but let's call initializeLives directly too for clarity on first start
    initializeLives(INITIAL_LIVES);
    setScore(0);
    setMissedBallStreak(0);
    setClickedBallStreak(0);
    setBalls([]);
    setGameOver(false);
  };
  
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
        <p className="text-xl text-foreground/80 mb-8">High Score: {highScore}</p>
        <Button onClick={startGame} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-2xl py-4 px-8 shadow-lg hover:shadow-xl transition-shadow">
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div ref={gameAreaRef} className="relative w-screen h-screen overflow-hidden bg-background select-none" aria-label="Game Area">
      <ScoreDisplay score={score} highScore={highScore} />
      <div ref={livesDisplayRef}>
        <LivesDisplay livesState={livesState} />
      </div>
      
      {balls.map((ball) => (
        <BallComponent key={ball.id} {...ball} onBallClick={handleBallClick} />
      ))}

      {isBonusAnimating && bonusBallTarget && (
        <div
          className="fixed rounded-full bg-accent z-[100]"
          style={{
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            left: '50vw', 
            top: '50vh', 
            // transform: 'translate(-50%, -50%)', // Initial position center for animation start
            animationName: 'big-ball-bonus-animation',
            animationDuration: '0.7s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            '--target-x': `${bonusBallTarget.x}px`, 
            '--target-y': `${bonusBallTarget.y}px`,
          } as React.CSSProperties}
        />
      )}

      {gameOver && <GameOverOverlay score={score} highScore={highScore} onRestart={restartGame} />}
    </div>
  );
};

export default GameScreen;

