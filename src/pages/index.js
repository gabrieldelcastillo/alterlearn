import React from "react";
import Footer from "../components/Footer";
import IndexHeader from "../components/index/IndexHeader"
import Image from "next/image";

export default function Index() {
    return (
        <div style={{
            display: "grid", 
            minHeight: '100dvh', 
            gridTemplateRows: 'auto 1fr auto'}}>
            <IndexHeader />
            <Footer />
        </div>
    )
}