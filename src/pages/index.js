import React from "react";
import Footer from "../components/Footer";
import UserIndexHeader from "../components/index/UserIndexHeader"
import NoUserIndexHeader from "../components/index/NoUserIndexHeader";
import FirstLine from "../components/index/FirstLine";
import SecondLine from "../components/index/SecondLine";
import ThirdLine from  "../components/index/ThirdLine"
import style from "../styles/index.module.css"

export default function Index() {
    return (
        <div className={style.app}>
            <NoUserIndexHeader />
            <FirstLine />
            <SecondLine />
            <ThirdLine />
        </div>
    );
};