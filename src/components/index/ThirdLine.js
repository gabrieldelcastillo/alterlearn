import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ThirdLine.module.css';

const ThirdLine = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            title: "Calculus: Early Transcendentals",
            author: "James Stewart",
            price: 1000,
            condition: "New",
            format: "Hardcover",
            cover: "https://picsum.photos/400/500?random=1",
            category: "Mathematics",
            career: "Engineering"
        },
        {
            id: 2,
            title: "Physics for Scientists and Engineers",
            author: "Serway & Jewett",
            price: 750,
            condition: "Used",
            format: "Digital",
            cover: "https://picsum.photos/400/500?random=2",
            category: "Physics",
            career: "Engineering"
        },
        // Add more products as needed
    ]);

    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortBy, setSortBy] = useState('default');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className={styles.container}>
            <motion.div 
                className={styles.productGrid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={itemVariants}
                        className={styles.productCard}
                    >
                        <div className={styles.imageContainer}>
                            <Image
                                src={product.cover}
                                alt={product.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        
                        <div className={styles.productInfo}>
                            <div className={styles.badgeContainer}>
                                <span className={styles.conditionBadge}>
                                    {product.condition}
                                </span>
                                <span className={styles.formatBadge}>
                                    {product.format}
                                </span>
                            </div>
                            
                            <h3 className={styles.title}>
                                {product.title}
                            </h3>
                            
                            <p className={styles.author}>
                                {product.author}
                            </p>
                            
                            <div className={styles.priceContainer}>
                                <span className={styles.price}>
                                    CLP$    {product.price}
                                </span>
                                <button 
                                    className={styles.addButton}
                                    onClick={() => {/* Add to cart functionality */}}
                                >
                                    Añadir al carro
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ThirdLine;