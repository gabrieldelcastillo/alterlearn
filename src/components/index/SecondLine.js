import React from "react";
import Image from "next/image";
import style from "./SecondLine.module.css"
import Link from "next/link";

export default function SecondLine() {
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Asignaturas</h1>
            <div className={style.subjects}>
                <Subject subjectImage={<Image src={""}/>} subjectName={""}></Subject>
            </div>
        </div>
    )
}

function Subject({ subjectName, subjectImage }) {
    return (
        <Link href="/search">
            <div>
                <Image src={subjectImage}/>
                <h1>{subjectName}</h1>
            </div>
        </Link>
    )
}