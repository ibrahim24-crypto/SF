import React from 'react';

interface ExplosionEffectProps {
  color: string;
  size: number; // Original ball size, to scale explosion appropriately
}

const ExplosionEffect: React.FC<ExplosionEffectProps> = ({ color, size }) => {
  const lines = 8;
  const explosionLineLength = size * 1.5; // Make explosion lines a bit larger than the ball

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
              backgroundColor: color === 'rainbow-gradient' ? 'hsl(var(--primary))' : color, // Use primary for rainbow, actual color otherwise
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default ExplosionEffect;
