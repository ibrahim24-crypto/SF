
import React from 'react';

interface ExplosionEffectProps {
  color: string;
  size: number; // Original ball size, to scale explosion appropriately
}

const ExplosionEffect: React.FC<ExplosionEffectProps> = ({ color, size }) => {
  const lines = 8;
  const explosionLineLength = size * 1.5; 

  let lineColor = color;
  if (color === 'rainbow-gradient') {
    lineColor = 'hsl(var(--primary))'; 
  } else if (color === 'hsl(0 0% 100%)') { // if ball is white
    lineColor = 'hsl(var(--foreground))'; // Use light foreground color for explosion lines on dark background
  }


  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="explosion-line"
          style={
            {
              '--angle': `${(360 / lines) * i}deg`,
              '--line-length': `${explosionLineLength}px`,
              backgroundColor: lineColor,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ExplosionEffect;
