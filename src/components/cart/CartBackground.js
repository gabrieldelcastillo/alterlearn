import styles from './CartBackground.module.css';

const CartBackground = ({ darkMode }) => {
  return (
    <div className={styles.background}>
      {[...Array(50)].map((_, index) => (
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