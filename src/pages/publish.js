import React from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import PublishComponent from "../components/publish/PublishComponent";

export default function Publish() {
    return (
        <div>
            <PublishComponent />

            <Footer/>
        </div>
    );
}
