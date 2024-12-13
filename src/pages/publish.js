import React, { useState } from 'react';
import PublishComponent from "../components/publish/PublishComponent";
import Header from "../components/Header";
import PublishBackground from "../components/publish/PublishBackground";

export default function Publish() {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="h-screen w-full overflow-hidden">
            <PublishBackground darkMode={darkMode} />
            <div className="relative z-10 h-full">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <PublishComponent darkMode={darkMode} />
            </div>
        </div>
    );
}
