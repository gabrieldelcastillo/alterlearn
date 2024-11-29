import React from "react";
import ProfileComponent from "../components/profile/ProfileComponent";
import ProfileHeader from "../components/profile/ProfileHeader";

export default function Profile() {
    return (
        <div>
            <ProfileHeader />
            <hr></hr>
            <ProfileComponent />
        </div>
    )
}