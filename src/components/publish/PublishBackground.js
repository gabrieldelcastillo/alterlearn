import React, { useEffect, useRef, useMemo } from 'react';
import { FiFile } from 'react-icons/fi';

const PublishBackground = ({ darkMode }) => {
  const containerRef = useRef(null);
  
  const styles = useMemo(() => ({
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      backgroundColor: darkMode ? '#1F2937' : '#ffffff',
    },
    icon: {
      position: 'absolute',
      fontSize: '24px',
      color: darkMode ? '#4ADE80' : '#000000',
      filter: darkMode 
        ? 'drop-shadow(0 0 5px rgba(74,222,128,0.5))' 
        : 'drop-shadow(0 0 5px rgba(0,0,0,0.3))',
      zIndex: 1,
    },
    trail: {
      position: 'absolute',
      height: '2px',
      backgroundColor: darkMode ? '#4ADE80' : '#000000',
      opacity: 0.3,
      filter: darkMode 
        ? 'drop-shadow(0 0 3px rgba(74,222,128,0.3))' 
        : 'drop-shadow(0 0 3px rgba(0,0,0,0.2))',
      zIndex: 1,
      maxWidth: '100px',
    }
  }), [darkMode]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const icons = new Set();
    let animationFrameId;
    const ICON_WIDTH = 24;
    let viewportHeight = container.clientHeight;

    const createIcon = () => {
      const safeHeight = viewportHeight - 100;
      const startY = 100 + (Math.random() * (safeHeight - 100));
      const speed = 1 + Math.random() * 1;
      let position = container.clientWidth;

      const iconWrapper = document.createElement('div');
      const trail = document.createElement('div');

      Object.assign(iconWrapper.style, styles.icon);
      Object.assign(trail.style, styles.trail);

      iconWrapper.innerHTML = '<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>';
      
      iconWrapper.style.transform = `translate(${position}px, ${startY}px)`;
      trail.style.transform = `translate(${position + ICON_WIDTH}px, ${startY + 12}px)`;
      trail.style.width = '0px';

      container.appendChild(trail);
      container.appendChild(iconWrapper);
      
      icons.add({
        icon: iconWrapper,
        trail,
        position,
        startY,
        speed,
      });
    };

    const animate = () => {
      icons.forEach(item => {
        item.position -= item.speed;
        item.icon.style.transform = `translate(${item.position}px, ${item.startY}px)`;
        
        const trailWidth = Math.min(container.clientWidth - (item.position + ICON_WIDTH), 100);
        
        if (item.position < 100) {
          const opacity = item.position / 100;
          item.trail.style.opacity = Math.max(0, opacity * 0.3);
        }

        item.trail.style.transform = `translate(${item.position + ICON_WIDTH}px, ${item.startY + 12}px)`;
        item.trail.style.width = `${trailWidth}px`;

        if (item.position < -50) {
          container.removeChild(item.icon);
          container.removeChild(item.trail);
          icons.delete(item);
        }
      });

      if (Math.random() < 0.02 && icons.size < 5) {
        createIcon();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      viewportHeight = container.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      icons.forEach(item => {
        container.removeChild(item.icon);
        container.removeChild(item.trail);
      });
      icons.clear();
    };
  }, [styles]);

  return <div ref={containerRef} style={styles.container} />;
};

export default PublishBackground;