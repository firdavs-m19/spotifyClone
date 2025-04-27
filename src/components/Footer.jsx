import React from "react";
import './Spotify.css'
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import VolumeTracker from "./VolumeTracker";

export default function Footer(){
    return (
        <div className="footerContainer">
            <CurrentTrack></CurrentTrack>
            <PlayerControls/>
            <VolumeTracker/>
        </div>
    )
}

