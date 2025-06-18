
import React from 'react';
import ExplosionEffect from './ExplosionEffect';
import { cn } from '@/lib/utils';

export interface BallProps {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  onBallClick: (id: string) => void;
  isExploding: boolean;
  isInstantExplodeModeActive?: boolean;
  ballPulseTrigger?: number;
}

const BallComponent: React.FC<BallProps> = ({
  id,
  x,
  y,
  radius,
  color,
  onBallClick,
  isExploding,
  isInstantExplodeModeActive,
  ballPulseTrigger,
}) => {
  const [applyPulse, setApplyPulse] = React.useState(false);
  const prevPulseTriggerRef = React.useRef<number | undefined>(ballPulseTrigger);

  React.useEffect(() => {
    if (ballPulseTrigger !== undefined && ballPulseTrigger !== prevPulseTriggerRef.current && ballPulseTrigger > 0) {
      setApplyPulse(true);
      const timer = setTimeout(() => {
        setApplyPulse(false);
      }, 300); // Duration of pulse animation (must match CSS)
      prevPulseTriggerRef.current = ballPulseTrigger;
      return () => clearTimeout(timer);
    }
  }, [ballPulseTrigger]);

  const sharedAction = () => {
    if (!isExploding) {
      onBallClick(id);
    }
  };

  const handleMouseEnter = () => {
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (isInstantExplodeModeActive) {
      sharedAction();
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    sharedAction();
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
      className={cn(
        color === 'rainbow-gradient' ? 'rainbow-gradient' : '',
        applyPulse && !isExploding && 'ball-pulse-animation'
      )}
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
