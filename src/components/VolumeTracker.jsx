import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsVolumeUpFill, BsVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";
import { useStateProvider } from "../utils/StateProvider";

export default function VolumeTracker() {
    const [{ token }] = useStateProvider();
    const [volume, setVolume] = useState(50); // Default volume at 50%
    const [isMuted, setIsMuted] = useState(false);

    // Fetch current volume from Spotify API
    useEffect(() => {
        const getVolume = async () => {
            try {
                const response = await axios.get("https://api.spotify.com/v1/me/player", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data?.device) {
                    setVolume(response.data.device.volume_percent);
                }
            } catch (error) {
                console.error("Error fetching volume:", error);
            }
        };
        getVolume();
    }, [token]);

    // Function to change volume
    const handleVolumeChange = async (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);

        try {
            await axios.put("https://api.spotify.com/v1/me/player/volume", null, {
                params: { volume_percent: newVolume },
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error setting volume:", error);
        }
    };

    // Mute/Unmute Toggle
    const toggleMute = async () => {
        const newVolume = isMuted ? 50 : 0; // Unmute sets volume back to 50%
        setVolume(newVolume);
        setIsMuted(!isMuted);

        try {
            await axios.put("https://api.spotify.com/v1/me/player/volume", null, {
                params: { volume_percent: newVolume },
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error("Error toggling mute:", error);
        }
    };

    return (
        <div className="volume-container">
            <button onClick={toggleMute} className="volume-button">
                {isMuted || volume === 0 ? (
                    <BsVolumeMuteFill size={20} />
                ) : volume < 50 ? (
                    <BsVolumeDownFill size={20} />
                ) : (
                    <BsVolumeUpFill size={20} />
                )}
            </button>
            <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
            />
        </div>
    );
}
