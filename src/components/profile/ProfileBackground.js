import React, { useEffect, useRef } from 'react';

const ProfileBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  class Dot {
    constructor(x, y, isVertical) {
      this.x = x;
      this.y = y;
      this.isVertical = isVertical;
      this.speed = 0.5 + Math.random() * 0.5;
      this.size = 3;
    }

    update(canvasHeight, canvasWidth) {
      if (this.isVertical) {
        this.y += this.speed;
        if (this.y > canvasHeight) {
          this.y = 0;
        }
      } else {
        this.x += this.speed;
        if (this.x > canvasWidth) {
          this.x = 0;
        }
      }
    }

    draw(ctx, darkMode) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = darkMode ? '#ef4444' : '#eab308'; // red-500 in dark mode, yellow-500 in light mode
      ctx.fill();
      
      // Add glow effect
      ctx.shadowBlur = 10;
      ctx.shadowColor = darkMode ? '#ef4444' : '#eab308';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let dots = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createDots = () => {
      dots = [];
      // Create dots for vertical lines
      const verticalLineCount = Math.floor(canvas.width / 50);
      for (let i = 0; i <= verticalLineCount; i++) {
        const x = i * 50;
        dots.push(new Dot(x, Math.random() * canvas.height, true));
      }

      // Create dots for horizontal lines
      const horizontalLineCount = Math.floor(canvas.height / 50);
      for (let i = 0; i <= horizontalLineCount; i++) {
        const y = i * 50;
        dots.push(new Dot(Math.random() * canvas.width, y, false));
      }
    };

    const drawGrid = () => {
      ctx.beginPath();
      ctx.strokeStyle = darkMode ? '#4ade80' : '#000000'; // green-400 in dark mode, black in light mode
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.2;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += 50) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += 50) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      ctx.fillStyle = darkMode ? '#1f2937' : '#ffffff'; // gray-800 in dark mode, white in light mode
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid();

      dots.forEach(dot => {
        dot.update(canvas.height, canvas.width);
        dot.draw(ctx, darkMode);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createDots();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createDots();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]); // Add darkMode as dependency

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ProfileBackground;
