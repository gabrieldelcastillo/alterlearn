import React from "react";
import styles from "./ThirdLine.module.css";

export default function ThirdLine() {
    const resources = {
        "Certámenes (con solución)": {
            price: "CLP$1000",
            items: [
                {
                    name: "Certamen 1",
                    year: 2021,
                    subject: "Cálculo",
                    contents: ["Derivadas", "Integrales"],
                },
                {
                    name: "Certamen 2",
                    year: 2020,
                    subject: "Probabilidad",
                    contents: ["Distribuciones", "Estadística"],
                },
                {
                    name: "Certamen 3",
                    year: 2023,
                    subject: "Álgebra",
                    contents: ["Matrices"],
                },
            ],
        },
        "Certámenes (sin solución)": {
            price: "CLP$800",
            items: [
                {
                    name: "Certamen 1",
                    year: 2022,
                    subject: "Geometría",
                    contents: ["Vectores", "Ángulos"],
                },
                {
                    name: "Certamen 2",
                    year: 2019,
                    subject: "Física",
                    contents: ["Cinemática", "Dinámica"],
                },
                {
                    name: "Certamen 3",
                    year: 2021,
                    subject: "Cálculo",
                    contents: ["Límites"],
                },
            ],
        },
        Apuntes: {
            price: "CLP$750",
            items: [
                {
                    name: "Apuntes Álgebra",
                    year: 2017,
                    subject: "Álgebra",
                    contents: ["Teoría", "Ejercicios"],
                },
                {
                    name: "Apuntes Probabilidad",
                    year: 2021,
                    subject: "Estadística",
                    contents: ["Teoría", "Ejemplos prácticos"],
                },
                {
                    name: "Apuntes Física",
                    year: 2018,
                    subject: "Física",
                    contents: ["Ondas", "Termodinámica"],
                },
            ],
        },
        Controles: {
            price: "CLP$500",
            items: [
                {
                    name: "Control 1",
                    year: 2023,
                    subject: "Estadística",
                    contents: ["Probabilidades"],
                },
                {
                    name: "Control 2",
                    year: 2020,
                    subject: "Álgebra",
                    contents: ["Ecuaciones lineales"],
                },
                {
                    name: "Control 3",
                    year: 2018,
                    subject: "Física",
                    contents: ["Trabajo", "Energía"],
                },
                {
                    name: "Control 4",
                    year: 2021,
                    subject: "Cálculo",
                    contents: ["Derivadas"],
                },
                {
                    name: "Control 5",
                    year: 2022,
                    subject: "Geometría",
                    contents: ["Transformaciones"],
                },
            ],
        },
        Tareas: {
            price: "CLP$250",
            items: [
                {
                    name: "Tarea 1",
                    year: 2020,
                    subject: "Cálculo",
                    contents: ["Integrales"],
                },
                {
                    name: "Tarea 2",
                    year: 2021,
                    subject: "Química",
                    contents: ["Reacciones químicas"],
                },
                {
                    name: "Tarea 3",
                    year: 2023,
                    subject: "Estadística",
                    contents: ["Datos agrupados"],
                },
                {
                    name: "Tarea 4",
                    year: 2019,
                    subject: "Física",
                    contents: ["Dinámica"],
                },
                {
                    name: "Tarea 5",
                    year: 2021,
                    subject: "Álgebra",
                    contents: ["Polinomios"],
                },
            ],
        },
    };

    return (
        <div className={styles.grid}>
            {Object.entries(resources).map(([category, data]) => (
                <div key={category} className={styles.column}>
                    <h3 className={styles.categoryTitle}>{category}</h3>
                    <p className={styles.categoryPrice}>{data.price}</p>
                    <div className={styles.itemsContainer}>
                        {data.items.map((item, index) => (
                            <div key={index} className={styles.itemCard}>
                                <p className={styles.itemName}>
                                    {item.name} ({item.year})
                                </p>
                                <p className={styles.subject}>{item.subject}</p>
                                <ul className={styles.contents}>
                                    {item.contents.map((content, idx) => (
                                        <li key={idx}>{content}</li>
                                    ))}
                                </ul>
                                <button className={styles.addButton}>Añadir al carro</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
