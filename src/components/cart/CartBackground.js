import { useState, useEffect } from 'react';
import styles from './CartBackground.module.css';

const CartBackground = ({ darkMode }) => {
  const [symbolCount, setSymbolCount] = useState(50);

  useEffect(() => {
    const calculateSymbols = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const screenArea = width * height;
      
      // Adjust these values to control density
      const baseDensity = 50000; // pixels² per symbol
      const count = Math.floor(screenArea / baseDensity);
      
      // Set minimum and maximum limits
      return Math.min(Math.max(count, 20), 100);
    };

    const handleResize = () => {
      setSymbolCount(calculateSymbols());
    };

    // Initial calculation
    handleResize();

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.background}>
      {[...Array(symbolCount)].map((_, index) => (
        <span
          key={index}
          className={`${styles.dollarSign} ${
            darkMode ? styles.darkMode : styles.lightMode
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
          }}
        >
          $
        </span>
      ))}
    </div>
  );
};

export default CartBackground;