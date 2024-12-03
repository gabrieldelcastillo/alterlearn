import React, { useState, useEffect, useCallback } from "react";

const MatrixRain = () => {
  const [drops, setDrops] = useState([]);

  const generateRandomChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const createDrop = useCallback(() => {
    return {
      // Increased x-axis spread by multiplying by 1.5
      x: Math.random() * window.innerWidth * 1.5,
      y: -20,
      speed: (Math.random() * 2.6 + 1.3) * 1.6,
      char: generateRandomChar(),
      // Modified opacity to generate lower values (0.2 to 0.4 range)
      opacity: Math.random() * 0.2 + 0.2,
      id: Math.random().toString(36),
      lastUpdate: Date.now()
    };
  }, []);

  useEffect(() => {
    // Updated interval to 25ms for more spacing between drops
    const dropGenerationInterval = setInterval(() => {
      setDrops(prevDrops => {
        const newDrops = [...prevDrops];
        newDrops.push(createDrop());
        return newDrops;
      });
    }, 25);

    const updateInterval = setInterval(() => {
      setDrops(prevDrops => {
        return prevDrops
          .map(drop => {
            if (drop.y > window.innerHeight) {
              return null;
            }
            const currentTime = Date.now();
            const timeDiff = currentTime - drop.lastUpdate;
            const shouldUpdateChar = timeDiff > (1000 + Math.random() * 2000);

            return {
              ...drop,
              y: drop.y + drop.speed * (13 / 50),
              char: shouldUpdateChar ? generateRandomChar() : drop.char,
              lastUpdate: shouldUpdateChar ? currentTime : drop.lastUpdate
            };
          })
          .filter(Boolean);
      });
    }, 16);

    return () => {
      clearInterval(dropGenerationInterval);
      clearInterval(updateInterval);
    };
  }, [createDrop]);

  return (
    <div className="relative w-full h-screen bg-gray-900 overflow-hidden" 
         role="region" 
         aria-label="Animated Matrix Rain Background">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="absolute text-white font-mono text-xl transform transition-all duration-200"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            opacity: drop.opacity,
            textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
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