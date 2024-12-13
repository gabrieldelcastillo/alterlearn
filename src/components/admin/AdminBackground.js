import React, { useState, useEffect, useMemo } from 'react';

const AdminBackground = ({ darkMode }) => {
  const GRID_SIZE = 32;
  const SNAKE_LENGTH = 12;
  const INTERVAL = 150;
  const NUM_SNAKES = 3;

  const grid = useMemo(() => {
    return Array.from({ length: GRID_SIZE }, () =>
      Array.from({ length: GRID_SIZE }, () => false)
    );
  }, []);

  const [snakes, setSnakes] = useState(() => {
    return Array.from({ length: NUM_SNAKES }, (_, index) => ({
      positions: Array.from({ length: SNAKE_LENGTH }, (_, i) => ({
        x: Math.floor(GRID_SIZE * ((index + 1) / (NUM_SNAKES + 1))),
        y: Math.floor(GRID_SIZE / 2) - i
      })),
      direction: { x: 1, y: 0 }
    }));
  });

  useEffect(() => {
    const moveSnakes = () => {
      setSnakes(prevSnakes => 
        prevSnakes.map(snake => {
          const newHead = {
            x: (snake.positions[0].x + snake.direction.x + GRID_SIZE) % GRID_SIZE,
            y: (snake.positions[0].y + snake.direction.y + GRID_SIZE) % GRID_SIZE
          };

          let newDirection = snake.direction;
          if (Math.random() < 0.05) {
            const directions = [
              { x: 1, y: 0 },
              { x: -1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: -1 }
            ];
            newDirection = directions[Math.floor(Math.random() * directions.length)];
          }

          return {
            positions: [newHead, ...snake.positions.slice(0, -1)],
            direction: newDirection
          };
        })
      );
    };

    const interval = setInterval(moveSnakes, INTERVAL);
    return () => clearInterval(interval);
  }, [GRID_SIZE]);

  return (
    <div className="fixed inset-0 -z-1 overflow-hidden pointer-events-none">
      <div 
        className="grid w-full h-full"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {grid.map((row, y) =>
          row.map((_, x) => {
            const snakeData = snakes.reduce((acc, snake, snakeIndex) => {
              const index = snake.positions.findIndex(pos => pos.x === x && pos.y === y);
              if (index !== -1) {
                return {
                  isSnake: true,
                  isHead: index === 0,
                  index,
                  snakeIndex
                };
              }
              return acc;
            }, { isSnake: false });

            return (
              <div
                key={`${x}-${y}`}
                className={`transition-all duration-200 flex items-center justify-center text-xs`}
              >
                {snakeData.isSnake && (
                  <div 
                    className={`
                      ${darkMode 
                        ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.7)] shadow-green-400/50' 
                        : 'text-black drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] shadow-black/50'
                      }
                      ${snakeData.isHead 
                        ? 'opacity-100 font-bold text-sm drop-shadow-[0_0_12px_rgba(74,222,128,0.9)]' 
                        : `opacity-${Math.max(20, 80 - (snakeData.index * 5))}`
                      }
                      transition-all duration-300
                    `}
                    style={{
                      textShadow: darkMode 
                        ? '0 0 10px rgba(74, 222, 128, 0.7), 0 0 20px rgba(74, 222, 128, 0.5)' 
                        : '0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    {(snakeData.index + snakeData.snakeIndex) % 2 ? '0' : '1'}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminBackground;
