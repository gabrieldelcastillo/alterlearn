import React, { useEffect, useRef } from 'react';

const IndexBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let connections = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1
        });
      }
    };

    const updateParticles = () => {
      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });
    };

    const drawGrid = () => {
      const gridSize = 30;
      const perspectiveOffset = Math.sin(time * 0.001) * 5;

      ctx.strokeStyle = darkMode 
        ? 'rgba(74, 222, 128, 0.1)' 
        : 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;

      // Draw perspective grid
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + perspectiveOffset, 0);
        ctx.lineTo(x - perspectiveOffset, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + perspectiveOffset);
        ctx.lineTo(canvas.width, y - perspectiveOffset);
        ctx.stroke();
      }
    };

    const findConnections = () => {
      connections = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            connections.push({
              start: particles[i],
              end: particles[j],
              opacity: 1 - (distance / 100)
            });
          }
        }
      }
    };

    const drawConnections = () => {
      connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        
        if (darkMode) {
          ctx.strokeStyle = `rgba(74, 222, 128, ${connection.opacity * 0.5})`;
          ctx.shadowColor = 'rgba(74, 222, 128, 0.8)';
          ctx.shadowBlur = 5;
        } else {
          ctx.strokeStyle = `rgba(0, 0, 0, ${connection.opacity * 0.3})`;
          ctx.shadowBlur = 0;
        }
        
        ctx.stroke();
      });
    };

    const drawParticles = () => {
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        
        if (darkMode) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
          ctx.shadowColor = 'rgba(74, 222, 128, 0.8)';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set background
      ctx.fillStyle = darkMode ? '#1f2937' : '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time++;
      
      // Draw all elements
      drawGrid();
      updateParticles();
      findConnections();
      drawConnections();
      drawParticles();
      
      // Digital rain effect
      if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        particles.push({
          x: x,
          y: 0,
          speedX: 0,
          speedY: 2,
          size: 2
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ opacity: 0.7 }}
    />
  );
};

export default IndexBackground;