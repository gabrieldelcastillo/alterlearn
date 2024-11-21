import React from "react";
import Footer from "../components/Footer";
import UserIndexHeader from "../components/index/UserIndexHeader"
import Image from "next/image";
import NoUserIndexHeader from "../components/index/NoUserIndexHeader";

export default function Index() {
    return (
        <div>
            <NoUserIndexHeader />
            <Footer />
        </div>
    )
}