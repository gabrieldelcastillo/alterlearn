import React, { useState, useEffect, useCallback, useMemo } from "react";

const MatrixRain = () => {
  const POOL_SIZE = 300;
  const GENERATION_INTERVAL = 30;
  const UPDATE_INTERVAL = 16;
  const VIEWPORT_BUFFER = 50;

  const [drops, setDrops] = useState([]);
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
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    let animationFrameId;

    const updateDrops = () => {
      setDrops(prevDrops => {
        const currentTime = Date.now();
        return prevDrops
          .map(drop => {
            if (drop.y > dimensions.height + VIEWPORT_BUFFER) {
              return null;
            }

            const timeDiff = currentTime - drop.lastUpdate;
            const shouldUpdateChar = timeDiff > 1000;

            return {
              ...drop,
              y: drop.y + drop.speed,
              char: shouldUpdateChar ? generateRandomChar() : drop.char,
              lastUpdate: shouldUpdateChar ? currentTime : drop.lastUpdate,
            };
          })
          .filter(Boolean);
      });

      animationFrameId = requestAnimationFrame(updateDrops);
    };

    animationFrameId = requestAnimationFrame(updateDrops);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions.height, generateRandomChar]);

  return (
    <div
      className="fixed inset-0 bg-gray-900 overflow-hidden pointer-events-none"
      role="region"
      aria-label="Animated Matrix Rain Background"
    >
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-white font-mono text-xl will-change-transform"
          style={{
            transform: `translate(${drop.x}px, ${drop.y}px)`,
            opacity: drop.opacity,
            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
          }}
          aria-hidden="true"
        >
          {drop.char}
        </div>
      ))}
    </div>
  );
};

export default MatrixRain;