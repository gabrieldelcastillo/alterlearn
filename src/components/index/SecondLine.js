import React from "react";
import Image from "next/image";
import style from "./SecondLine.module.css"

export default function SecondLine() {
    const subjects = [
        { name: "Matemáticas", image: "/ingenieria.jpg" },
        { name: "Medicina", image: "/medicina.jpg" },
        { name: "Programación", image: "/cine.jpg" },
        { name: "Humanistas", image: "/derecho.jpg" },
        { name: "Marketing", image: "/sociologia.jpg" },
        { name: "Física", image: "/administracion.jpg" },
        { name: "Inglés", image: "/teatro.jpg" },
        { name: "Química", image: "/quimica.jpg" },
        { name: "Finanzas", image: "/diseno.jpg" },
        { name: "Anatomía", image: "/ecologia.jpg" },
        { name: "Economía", image: "/arquitectura.jpg" },
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
                                    subjectName={subject.name} 
                                    backgroundImage={<Image src={subject.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul className={style.ul}>
                        {subjects.map((subject, index) => (
                            <li key={`duplicate-${index}`}>
                                <Subject
                                    subjectName={subject.name} 
                                    backgroundImage={<Image src={subject.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Subject({ subjectName, backgroundImage }) {
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
                backgroundImage: backgroundImage,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '250px',
                height: '100px',
            }}
        >
            <h2 style={{textAlign: 'center', color: 'fff', fontSize: '30px'}}>{subjectName}</h2>
        </div>
    );
}