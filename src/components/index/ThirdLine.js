import React from "react";
import styles from "./ThirdLine.module.css"; // Archivo de estilos

export default function ThirdLine() {
    const resources = [
        {
            category: "Certámenes (con solución)",
            price: "CLP$1000",
            items: ["Matemáticas", "Física", "Química"],
        },
        {
            category: "Certámenes (sin solución)",
            price: "CLP$800",
            items: ["Biología", "Historia", "Filosofía"],
        },
        {
            category: "Controles",
            price: "CLP$500",
            items: ["Química", "Biología", "Física"],
        },
        {
            category: "Tareas",
            price: "CLP$250",
            items: ["Historia", "Literatura", "Arte"],
        },
        {
            category: "Apuntes",
            price: "CLP$750",
            items: ["Filosofía", "Economía", "Diseño"],
        },
    ];

    return (
        <div className={styles.grid}>
            {resources.map((resource, index) => (
                <div key={index} className={styles.column}>
                    <h2 className={styles.categoryTitle}>{resource.category}</h2>
                    <p className={styles.categoryPrice}>{resource.price}</p>
                    <div className={styles.itemsContainer}>
                        {resource.items.map((item, itemIndex) => (
                            <div key={itemIndex} className={styles.itemCard}>
                                <h3 className={styles.itemName}>{item}</h3>
                                <button className={styles.addButton}>Añadir al Carro</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
