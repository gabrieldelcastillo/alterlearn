import React from "react";
import Footer from "../components/Footer";
import UserIndexHeader from "../components/index/UserIndexHeader"
import NoUserIndexHeader from "../components/index/NoUserIndexHeader";
import FirstLine from "../components/index/FirstLine";
import SecondLine from "../components/index/SecondLine";

export default function Index() {
    return (
        <div>
            <NoUserIndexHeader />
            <FirstLine />
            <SecondLine />
            <Footer />
        </div>
    );
};