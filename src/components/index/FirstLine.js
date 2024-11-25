import React from "react";
import Image from "next/image";
import styles from "./FirstLine.module.css";

export default function FirstLine() {
    const careers = ["ingenieria", "medicina", "cine", 
                     "derecho", "sociologia", "administracion", 
                     "teatro", "quimica", "diseno", 
                     "ecologia", "arquitectura", "ver_mas"]

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>Carreras</h1>
            <div className={styles.scrollContainer}>
                <div className={styles.scrollContent}>
                    <Subject nombreAsignatura={careers[0]}/>
                    <Subject nombreAsignatura={careers[1]}/>
                    <Subject nombreAsignatura={careers[2]}/>
                    <Subject nombreAsignatura={careers[3]}/>
                    <Subject nombreAsignatura={careers[4]}/>
                    <Subject nombreAsignatura={careers[5]}/>
                    <Subject nombreAsignatura={careers[6]}/>
                    <Subject nombreAsignatura={careers[7]}/>
                    <Subject nombreAsignatura={careers[8]}/>
                    <Subject nombreAsignatura={careers[9]}/>
                    <Subject nombreAsignatura={careers[10]}/>
                    <Subject nombreAsignatura={careers[11]}/>
                </div>
            </div>
        </div>
    );
}

function Subject({ nombreAsignatura }) {
    return (
        <div
            style={{
                display: "block",
                padding: "10px",
                borderStyle: "solid",
                borderRadius: "10px",
                margin: "0 10px",
                textAlign: "center",
            }}
        >
            <h2>{nombreAsignatura}</h2>
        </div>
    );
}
