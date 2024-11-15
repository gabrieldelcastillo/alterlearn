import React from "react";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Index() {
    return (
        <div style={{
            backgroundImage: `url('C:\Users\Watson Scott\Documents\GitHub\alterlearn\src\images\index_background1.jpg')`,
            backgroundSize: 'cover',
            width: `100%`,
            height: `100%`
        }}>
            
            <Footer />
        </div>
    )
}