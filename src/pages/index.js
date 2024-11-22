import React from "react";
import Footer from "../components/Footer";
import NoUserIndexHeader from "../components/index/NoUserIndexHeader";
import FirstLine from "../components/index/FirstLine";

export default function Index() {
    return (
        <div>
            <NoUserIndexHeader />
            <FirstLine />
            <Footer />
        </div>
    );
};