import { useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  delay: number;
  color: string;
}

export const Fireworks = ({ isActive }: { isActive: boolean }) => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const colors = [
      'hsl(45 100% 70%)',
      'hsl(280 89% 70%)',
      'hsl(200 89% 70%)',
      'hsl(160 84% 58%)',
      'hsl(320 89% 70%)',
    ];

    const generateFireworks = () => {
      const newFireworks: Firework[] = [];
      for (let i = 0; i < 8; i++) {
        newFireworks.push({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 20,
          delay: Math.random() * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      setFireworks(newFireworks);
    };

    generateFireworks();
    const interval = setInterval(generateFireworks, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {fireworks.map((firework) => (
        <div
          key={`${firework.id}-${Date.now()}`}
          className="absolute"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            animationDelay: `${firework.delay}s`,
          }}
        >
          <div
            className="w-2 h-2 rounded-full animate-ping"
            style={{
              backgroundColor: firework.color,
              boxShadow: `0 0 20px ${firework.color}`,
            }}
          />
          {/* Burst effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-8 opacity-70"
              style={{
                backgroundColor: firework.color,
                transform: `rotate(${i * 45}deg) translateY(-20px)`,
                transformOrigin: 'center bottom',
                animation: `fade-in-up 0.8s ease-out ${firework.delay + 0.5}s forwards`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};