import { useEffect, useRef } from 'react';

const HelpBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    let frequency = 0.01;
    let waves = 5;
    let frame = 0;

    const animate = () => {
      frame += 0.03;
      ctx.fillStyle = isDarkMode ? '#111827' : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let j = 0; j < waves; j++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        const amplitude = 50 + (j * 20);
        const yOffset = canvas.height - 100 - (j * 50);
        const opacity = 0.1 - (j * 0.01);
        
        // Draw wave path
        for (let i = 0; i <= canvas.width; i++) {
          const dx = i;
          const dy = yOffset + 
            Math.sin(dx * frequency - frame + j * Math.PI * 0.5) * amplitude +
            Math.sin(dx * frequency * 0.5 - frame + j * Math.PI * 0.5) * amplitude * 0.5;
          
          ctx.lineTo(dx, dy);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        
        // Create gradient for each wave based on theme
        const gradient = ctx.createLinearGradient(0, yOffset - amplitude, 0, canvas.height);
        if (isDarkMode) {
          gradient.addColorStop(0, `rgba(34, 197, 94, ${opacity})`);
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
        } else {
          gradient.addColorStop(0, `rgba(0, 0, 0, ${opacity})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      // Glow effect based on theme
      ctx.shadowBlur = 20;
      ctx.shadowColor = isDarkMode 
        ? 'rgba(34, 197, 94, 0.5)' 
        : 'rgba(0, 0, 0, 0.5)';
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 -z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-gray-900"
      />
      <div className="absolute inset-0">
        <div className={`absolute w-1/3 h-1/3 ${isDarkMode ? 'bg-green-500/10' : 'bg-black/10'} blur-[100px] top-1/4 left-1/4 animate-pulse`} />
        <div className={`absolute w-1/4 h-1/4 ${isDarkMode ? 'bg-green-500/10' : 'bg-black/10'} blur-[80px] bottom-1/3 right-1/3 animate-pulse-slow`} />
        <div className={`absolute w-1/2 h-1/2 ${isDarkMode ? 'bg-green-500/5' : 'bg-black/5'} blur-[120px] top-1/3 right-1/4 animate-pulse-slower`} />
      </div>
    </div>
  );
};

export default HelpBackground;
