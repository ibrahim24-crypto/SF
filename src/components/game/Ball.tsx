import React from 'react';
import ExplosionEffect from './ExplosionEffect';

export interface BallProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  onBallClick: (id: string) => void;
  isExploding: boolean;
}

const BallComponent: React.FC<BallProps> = ({ id, x, y, radius, color, onBallClick, isExploding }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevents click from bubbling to game area if needed
    if (!isExploding) {
      onBallClick(id);
    }
  };

  const ballStyle: React.CSSProperties = {
    left: `${x}%`,
    top: `${y}px`,
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
    transition: 'top 0.05s linear', // Smooths movement slightly for high frame rates
  };

  if (color === 'rainbow-gradient') {
    // Applied via className for animation
  } else {
    ballStyle.backgroundColor = color;
  }

  if (isExploding) {
    return (
      <div style={{ ...ballStyle, backgroundColor: 'transparent', boxShadow: 'none' }} className="pointer-events-none">
        <ExplosionEffect color={color} size={radius * 2}/>
      </div>
    );
  }

  return (
    <div
      style={ballStyle}
      className={`${color === 'rainbow-gradient' ? 'rainbow-gradient' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label="Falling ball"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as any);}}
    />
  );
};

export default BallComponent;
