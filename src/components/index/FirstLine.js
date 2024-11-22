import React from "react";
import Image from "next/image";

export default function FirstLine() {
    return (
        <div style={{display: "inline-flex"}}>
            <Subject />
            <Subject />
        </div>
    );
};

function Subject() {
    return (
        <div style={{padding: '10px', borderStyle: 'solid'}}>
            <Image />
            <h2 style={{textAlign: 'center'}}>Asignatura 1</h2>
        </div>
    );
};