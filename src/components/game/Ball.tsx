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
    event.stopPropagation(); 
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
    transition: 'top 0.05s linear', 
  };

  if (color === 'rainbow-gradient') {
    // Applied via className for animation
  } else {
    ballStyle.backgroundColor = color;
  }

  // The BallComponent itself is removed when isExploding becomes true for a duration,
  // then fully removed from the balls array.
  // The ExplosionEffect is rendered by GameScreen or BallComponent itself during the exploding phase.
  // If BallComponent handles its own explosion rendering:
  if (isExploding) {
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
      role="button"
      aria-label="Falling ball"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(e as any);}}
    />
  );
};

export default BallComponent;
