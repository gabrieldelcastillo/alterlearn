import React, { useState, useEffect, useCallback, useMemo } from "react";

const MatrixRain = () => {
  const POOL_SIZE = 100;
  const GENERATION_INTERVAL = 100;
  const VIEWPORT_BUFFER = 50;

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const chars = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", []);

  const generateRandomChar = useCallback(() => {
    return chars[Math.floor(Math.random() * chars.length)];
  }, [chars]);

  const createDrop = useCallback(() => {
    return {
      x: Math.random() * dimensions.width,
      y: -20,
      speed: Math.random() * 2 + 0.1,
      char: generateRandomChar(),
      opacity: Math.random() * 0.3 + 0.2,
      id: Math.random().toString(36).substr(2, 9),
      lastUpdate: Date.now(),
    };
  }, [dimensions.width, generateRandomChar]);

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const [drops, setDrops] = useState([]);
  useEffect(() => {
    if (drops.length >= POOL_SIZE) return;

    const dropGenerationInterval = setInterval(() => {
      setDrops(prevDrops => {
        if (prevDrops.length >= POOL_SIZE) return prevDrops;
        return [...prevDrops, createDrop()];
      });
    }, GENERATION_INTERVAL);

    return () => clearInterval(dropGenerationInterval);
  }, [drops.length, createDrop]);

  useEffect(() => {
    let lastUpdate = 0;
    const minInterval = 16;

    const updateDrops = (timestamp) => {
      if (timestamp - lastUpdate >= minInterval) {
        lastUpdate = timestamp;
        
        setDrops(prevDrops => {
          const currentTime = Date.now();
          return prevDrops
            .filter(drop => drop.y <= dimensions.height + VIEWPORT_BUFFER)
            .map(drop => {
              const timeDiff = currentTime - drop.lastUpdate;
              const shouldUpdateChar = timeDiff > 1000;

              return {
                ...drop,
                y: drop.y + drop.speed,
                char: shouldUpdateChar ? generateRandomChar() : drop.char,
                lastUpdate: shouldUpdateChar ? currentTime : drop.lastUpdate,
              };
            });
        });
      }

      animationFrameId = requestAnimationFrame(updateDrops);
    };

    let animationFrameId = requestAnimationFrame(updateDrops);
    return () => cancelAnimationFrame(animationFrameId);
  }, [dimensions.height, generateRandomChar]);

  const containerStyle = useMemo(() => ({
    position: 'fixed',
    inset: 0,
    backgroundColor: '#111827',
    overflow: 'hidden',
    pointerEvents: 'none',
  }), []);

  return (
    <div
      style={containerStyle}
      role="region"
      aria-label="Animated Matrix Rain Background"
    >
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-white font-mono text-xl"
          style={{
            transform: `translate3d(${drop.x}px, ${drop.y}px, 0)`,
            opacity: drop.opacity,
            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

export default React.memo(MatrixRain);