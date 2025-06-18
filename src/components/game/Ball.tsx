
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
    if (!isExploding) { // Check local isExploding prop
      onBallClick(id);
    }
  };

  const handleMouseEnter = () => {
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    // Consider event.preventDefault() if it causes issues with subsequent clicks
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
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
    transition: 'top 0.05s linear',
  };

  if (color === 'rainbow-gradient') {
    // Applied via className for animation
  } else {
    ballStyle.backgroundColor = color;
  }

  if (isExploding) { // This is the prop passed from GameScreen
    return (
      <div style={{
          left: `${x}%`,
          top: `${y}px`,
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
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
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      role="button"
      aria-label="Falling ball"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as any);}}
    />
  );
};

export default React.memo(BallComponent);
