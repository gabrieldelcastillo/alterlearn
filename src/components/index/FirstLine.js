import React from "react";
import Image from "next/image";
import style from "./FirstLine.module.css"

export default function FirstLine() {
    const careers = [
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
                        {careers.map((career, index) => (
                            <li key={index}>
                                <Career 
                                    careerName={career.name} 
                                    backgroundImage={<Image src={career.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                    <ul className={style.ul}>
                        {careers.map((career, index) => (
                            <li key={`duplicate-${index}`}>
                                <Career 
                                    careerName={career.name} 
                                    backgroundImage={<Image src={career.image}/>}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Career({ careerName, backgroundImage }) {
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
            <h2 style={{textAlign: 'center', color: 'fff', fontSize: '30px'}}>{careerName}</h2>
        </div>
    );
}