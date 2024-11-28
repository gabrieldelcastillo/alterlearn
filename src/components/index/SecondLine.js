import React from "react";
import Image from "next/image";
import style from "./SecondLine.module.css"
import Link from "next/link";
import matematicas from "./images/matematicas.jpg"

export default function SecondLine() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Asignaturas</h1>
            <div className={style.subjects}>
                <Subject subjectImage={matematicas} subjectName="Matemáticas" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Física" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Humanistas" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Programación" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Medicina" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Inglés" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Química" />
                <Subject subjectImage="/path-to-your-image.png" subjectName="Ver Más" />
            </div>
        </div>
    )
}

function Subject({ subjectName, subjectImage }) {
    return (
        <Link href="/search" className={style.link}>
            <button className={style.container}>
                <div className={style.imageWrapper}>
                    <Image 
                        src={subjectImage} 
                        alt={subjectName}
                        width={80}
                        height={80}
                        className={style.image}
                    />
                </div>
                <h2 className={style.name}>{subjectName}</h2>
            </button>
        </Link>
    )
}