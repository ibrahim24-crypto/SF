
import React from 'react';
import ExplosionEffect from './ExplosionEffect';

export interface BallProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  onBallClick: (id: string) => void; // Simplified: no eventType
  isExploding: boolean;
  isInstantExplodeModeActive?: boolean;
}

const BallComponent: React.FC<BallProps> = ({
  id,
  x,
  y,
  radius,
  color,
  onBallClick,
  isExploding,
  isInstantExplodeModeActive
}) => {
  const sharedAction = () => {
    if (!isExploding) { // Check local isExploding prop passed from GameScreen
      onBallClick(id);
    }
  };

  const handleMouseEnter = () => {
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    // event.preventDefault(); // Consider if it causes issues with subsequent clicks/scrolls
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent click from bubbling up to game area if needed
    sharedAction(); // Always call sharedAction on click
  };

  const ballStyle: React.CSSProperties = {
    left: `${x}%`,
    top: `${y}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: isInstantExplodeModeActive ? 'crosshair' : 'pointer',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
    transition: 'top 0.05s linear', // Smooth fall, consider removing if performance is an issue
  };

  if (color === 'rainbow-gradient') {
    // Applied via className for animation
  } else {
    ballStyle.backgroundColor = color;
  }

  if (isExploding) { // This is the prop passed from GameScreen, managed by GameScreen's state
    return (
      <div style={{ // Container for the explosion effect at the ball's last position
          left: `${x}%`,
          top: `${y}px`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none' // Explosion should not be interactive
        }}
      >
        <ExplosionEffect color={color} size={radius * 2}/>
      </div>
    );
  }

  return (
    <div
      style={ballStyle}
      className={`${color === 'rainbow-gradient' ? 'rainbow-gradient' : ''}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter} // For instant explode mode on desktop
      onTouchStart={handleTouchStart} // For instant explode mode on touch devices
      role="button"
      aria-label="Falling ball"
      tabIndex={0} // Make it focusable
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as any);}} // Accessibility for keyboard users
    />
  );
};

export default React.memo(BallComponent);

    