
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import BallComponent, { type BallProps as BallData } from './Ball';
import GameHeader from './GameHeader';
import GameOverOverlay from './GameOverOverlay';
import { Button } from '@/components/ui/button';

const INITIAL_LIVES = 5;
const BALL_RADIUS = 20;
const BALL_FALL_SPEED = 2;
const BALL_GENERATION_INTERVAL = 1500;
const MISSED_BALLS_PER_LIFE_LOSS = 5;
const CLICKED_BALLS_PER_LIFE_GAIN = 30;
const EXPLOSION_DURATION = 300;
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
  const processedMissesThisTick = useRef<Set<string>>(new Set());


  useEffect(() => {
    setIsClient(true);
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      console.log(`Loaded high score from localStorage: ${storedHighScore}`);
      setHighScore(parseInt(storedHighScore, 10));
    } else {
      console.log("No high score found in localStorage. Initializing to 0.");
      setHighScore(0);
    }
    initializeLives(INITIAL_LIVES);
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
      if (newStreak > 0 && newStreak % CLICKED_BALLS_PER_LIFE_GAIN === 0) {
        setLivesState(prevLives => {
          if (prevLives.filter(l => !l.exploding).length >= INITIAL_LIVES * 2) return prevLives;

          const newLifeId = `life-${prevLives.length}-${Date.now()}`;
          const livesElements = document.querySelectorAll('[aria-label="Life remaining"]');
          const lastLifeElement = livesElements[livesElements.length -1];

          if (lastLifeElement) {
            const livesDisplayRect = lastLifeElement.parentElement?.parentElement?.getBoundingClientRect();
            if (livesDisplayRect) {
                const targetX = livesDisplayRect.right + BALL_RADIUS * 0.6 + 8; // 8 for spacing between balls
                const targetY = livesDisplayRect.top + livesDisplayRect.height / 2;
                setBonusBallTarget({ x: targetX, y: targetY });
            } else {
                 setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
            }
          } else {
            // Fallback if no lives are currently displayed (e.g., very first life gain)
            const livesContainer = document.querySelector('.flex.space-x-2.items-center.bg-primary\\/80'); // Class for LivesDisplay container
            if(livesContainer) {
                const rect = livesContainer.getBoundingClientRect();
                const targetX = rect.left + BALL_RADIUS * 0.6; // Approx first ball position
                const targetY = rect.top + rect.height / 2;
                setBonusBallTarget({ x: targetX, y: targetY });
            } else {
                // Absolute fallback
                setBonusBallTarget({ x: window.innerWidth - 100, y: 50 });
            }
          }

          setIsBonusAnimating(true);
          setTimeout(() => {
            setLivesState(prev => [...prev, { id: newLifeId, exploding: false }]);
            setIsBonusAnimating(false);
            setBonusBallTarget(null);
          }, 700); // Corresponds to animation duration
          return prevLives;
        });
        return 0; // Reset streak
      }
      return newStreak;
    });
  }, [gameOver, setBalls, setScore, setClickedBallStreak, setLivesState, setIsBonusAnimating, setBonusBallTarget]);


  const handleBallMiss = useCallback((ballId: string) => {
    if (gameOver) return;

    setMissedBallStreak((currentStreakMbs) => {
      const newCalculatedStreak = currentStreakMbs + 1;

      console.log(`DEBUG Ball Missed (ID: ${ballId}):`);
      console.log(`  - Streak BEFORE this miss (currentStreakMbs): ${currentStreakMbs}`);
      console.log(`  - Streak AFTER this miss (newCalculatedStreak): ${newCalculatedStreak}`);
      console.log(`  - THRESHOLD for life loss (MISSED_BALLS_PER_LIFE_LOSS): ${MISSED_BALLS_PER_LIFE_LOSS}`);

      const conditionMet = (newCalculatedStreak > 0 && newCalculatedStreak % MISSED_BALLS_PER_LIFE_LOSS === 0);
      console.log(`  - CHECKING: (${newCalculatedStreak} > 0 && ${newCalculatedStreak} % ${MISSED_BALLS_PER_LIFE_LOSS} === 0) evaluates to: ${conditionMet}`);

      if (conditionMet) {
        console.log(`  - RESULT: Life loss condition MET. Losing a life. Streak will be reset to 0.`);
        setLivesState(prevLives => {
          const firstNonExplodingLifeIndex = prevLives.findIndex(l => !l.exploding);
          if (firstNonExplodingLifeIndex !== -1) {
            const updatedLives = [...prevLives];
            updatedLives[firstNonExplodingLifeIndex] = { ...updatedLives[firstNonExplodingLifeIndex], exploding: true };

            const remainingLives = updatedLives.filter(l => !l.exploding).length;
            console.log(`    - Life ${updatedLives[firstNonExplodingLifeIndex].id} marked exploding. Remaining non-exploding lives: ${remainingLives}`);

            if (remainingLives === 0) {
              console.log(`    - GAME OVER. Final Score: ${score}, Current High Score: ${highScore}`);
              if (score > highScore) {
                console.log(`    - New High Score! ${score} > ${highScore}. Saving.`);
                setHighScore(score);
                localStorage.setItem(HIGH_SCORE_KEY, score.toString());
              }
              setGameOver(true);
            }
            return updatedLives;
          }
          console.log(`    - No non-exploding life found to remove (should not happen if game not over).`);
          return prevLives;
        });
        return 0; // Reset streak to 0
      } else {
        console.log(`  - RESULT: Life loss condition NOT MET. Streak becomes ${newCalculatedStreak}.`);
        return newCalculatedStreak; // Increment streak
      }
    });
  }, [gameOver, score, highScore, setLivesState, setMissedBallStreak, setHighScore, setGameOver]);

  const getBallColor = useCallback((currentScore: number): string => {
    if (currentScore > 500) return 'rainbow-gradient'; // Example: Rainbow ball after 500 points
    const TIER_SCORE = 30; // Change color every 30 points
    const tier = Math.floor(currentScore / TIER_SCORE);
    const colors = ['#FFFFFF', '#FFFF00', '#90EE90', '#ADD8E6', '#FFC0CB', '#E6E6FA', '#FFA500']; // Cycle through these colors
    return colors[tier % colors.length] || '#FFFFFF'; // Default to white if something goes wrong
  }, []);

  const generateBall = useCallback(() => {
    if (!gameAreaRef.current || !isClient || gameOver) return;
    const gameAreaWidth = gameAreaRef.current.offsetWidth;
    if (gameAreaWidth === 0) return; // Avoid division by zero if gameArea not rendered
    const newBall: BallData = {
      id: `ball-${Date.now()}-${Math.random()}`,
      x: Math.random() * (100 - (BALL_RADIUS * 2 * 100 / gameAreaWidth)) + (BALL_RADIUS * 100 / gameAreaWidth), // x in %
      y: -BALL_RADIUS, // Start above screen
      radius: BALL_RADIUS,
      color: getBallColor(score),
      onBallClick: handleBallClick, // Passed down
      isExploding: false,
    };
    setBalls((prevBalls) => [...prevBalls, newBall]);
  }, [score, getBallColor, isClient, handleBallClick, gameOver, setBalls]);


  useEffect(() => {
    if (!gameStarted || gameOver || !isClient) return;
    const intervalId = setInterval(generateBall, BALL_GENERATION_INTERVAL);
    return () => clearInterval(intervalId);
  }, [gameStarted, gameOver, generateBall, isClient]);

  useEffect(() => {
    if (!gameStarted || gameOver || !isClient) return;
    let animationFrameId: number;

    const gameLoop = () => {
      // Reset for this tick, ensures handleBallMiss is called once per ball miss event within this tick
      processedMissesThisTick.current.clear();

      if (!gameAreaRef.current) {
        animationFrameId = requestAnimationFrame(gameLoop);
        return;
      }
      const gameAreaHeight = gameAreaRef.current.offsetHeight;
      if (gameAreaHeight <= 0) { // Ensure game area has valid height
          animationFrameId = requestAnimationFrame(gameLoop);
          return;
      }

      setBalls((prevBalls) =>
        prevBalls
          .map((ball) => {
            if (ball.isExploding) return ball; // Keep exploding balls until their own timeout removes them
            const newY = ball.y + BALL_FALL_SPEED;
            if (newY > gameAreaHeight + ball.radius) { // Ball is off-screen
              if (!processedMissesThisTick.current.has(ball.id)) {
                handleBallMiss(ball.id);
                processedMissesThisTick.current.add(ball.id); // Mark as processed for this tick
              }
              return null; // Mark for removal
            }
            return { ...ball, y: newY };
          }).filter(Boolean) as BallData[] // Remove nulls (missed balls)
      );
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameStarted, gameOver, isClient, handleBallMiss, setBalls]);


  const restartGame = () => {
    setScore(0);
    initializeLives(INITIAL_LIVES);
    setMissedBallStreak(0);
    setClickedBallStreak(0);
    setBalls([]);
    setGameOver(false);
    setGameStarted(true); // Make sure game starts
    // Reload high score from localStorage in case it was updated in another tab or session
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      const numStoredHighScore = parseInt(storedHighScore, 10);
      console.log(`Restarting game. Loaded high score from localStorage: ${numStoredHighScore}`);
      if (numStoredHighScore !== highScore) {
         setHighScore(numStoredHighScore); // Update if different
      }
    } else {
      console.log("Restarting game. No high score in localStorage, ensuring it's 0.");
      setHighScore(0); // If no stored high score, ensure it's 0
    }
  };

  const startGame = () => {
    // Ensure high score is correctly loaded/reset at the very start
    const storedHighScore = localStorage.getItem(HIGH_SCORE_KEY);
    if (storedHighScore) {
      const numStoredHighScore = parseInt(storedHighScore, 10);
       console.log(`Starting game. Loaded high score from localStorage: ${numStoredHighScore}`);
      if (numStoredHighScore !== highScore) { // Only set if different from current state
         setHighScore(numStoredHighScore);
      }
    } else if (highScore !== 0) { // If no stored high score but state isn't 0, reset it
        console.log(`Starting game. No stored high score, resetting highScore state from ${highScore} to 0.`);
        setHighScore(0);
    }

    setGameStarted(true);
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
      <GameHeader score={score} highScore={highScore} livesState={livesState} />

      {balls.map((ball) => (
        <BallComponent key={ball.id} {...ball} onBallClick={handleBallClick} />
      ))}

      {isBonusAnimating && bonusBallTarget && (
        <div
          className="fixed rounded-full bg-accent z-[100]" // Ensure it's above other elements
          style={{
            width: `${BALL_RADIUS * 2}px`,
            height: `${BALL_RADIUS * 2}px`,
            left: '50vw', // Start from center
            top: '50vh',  // Start from center
            transform: 'translate(-50%, -50%)', // Adjust for centering
            animationName: 'big-ball-bonus-animation',
            animationDuration: '0.7s',
            animationTimingFunction: 'ease-out',
            animationFillMode: 'forwards',
            // CSS variables for target position
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
    
