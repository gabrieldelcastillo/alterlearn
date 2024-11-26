import React from "react";
import Image from "next/image";
import style from "./FirstLine.module.css"

export default function FirstLine() {
    const subjects = [
        { name: "Ingeniería", image: "/ingenieria.jpg" },
        { name: "Medicina", image: "/medicina.jpg" },
        { name: "Cine", image: "/cine.jpg" },
        { name: "Derecho", image: "/derecho.jpg" },
        { name: "Sociología", image: "/sociologia.jpg" },
        { name: "Administración", image: "/administracion.jpg" },
        { name: "Teatro", image: "/teatro.jpg" },
        { name: "Química", image: "/quimica.jpg" },
        { name: "Diseño", image: "/diseno.jpg" },
        { name: "Ecología", image: "/ecologia.jpg" },
        { name: "Arquitectura", image: "/arquitectura.jpg" },
        { name: "Ver Más", image: "/cart.png" }
    ];
    

    return (
        <div className={style.wrapper}>
            <h1 style={{textAlign: 'center'}}>Carreras</h1>
            <div className={style.scrollContainer}>
                <div className={style.scrollContent}>
                    <ul className={style.ul}>
                        {subjects.map((subject, index) => (
                            <li key={index}>
                                <Subject 
                                    nombreAsignatura={subject.name} 
                                    imagenFondo={<Image src={subject.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                    {/* Duplicate list for smooth infinite scroll */}
                    <ul className={style.ul}>
                        {subjects.map((subject, index) => (
                            <li key={`duplicate-${index}`}>
                                <Subject 
                                    nombreAsignatura={subject.name} 
                                    imagenFondo={<Image src={subject.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Subject({ nombreAsignatura, imagenFondo }) {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: 'center',
                alignItems: 'center',
                padding: "10px",
                borderStyle: "solid",
                borderRadius: "10px",
                margin: "0 10px",
                textAlign: "center",
                backgroundImage: `url($(imagenFondo))`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '150px',
                height: '150px',
            }}
        >
            <h2 style={{textAlign: 'center', color: 'fff', fontSize: '30px'}}>{nombreAsignatura}</h2>
        </div>
    );
}