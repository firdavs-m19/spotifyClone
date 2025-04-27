import React from "react";
import axios from "axios"; 
import {
    BsFillPlayCircleFill,
    BsFillPauseCircleFill,
    BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function PlayerControls() {
    const [{ token, playerState }, dispatch] = useStateProvider();

    const checkActiveDevice = async () => {
        try {
            const devicesResponse = await axios.get(
                "https://api.spotify.com/v1/me/player/devices",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (!devicesResponse.data.devices.length) {
                console.error("No active device found. Open Spotify on a device.");
                return false;
            }
            return true;
        } catch (error) {
            console.error("Error checking active device:", error);
            return false;
        }
    };

    const changeTrack = async (type) => {
        try {
            const hasActiveDevice = await checkActiveDevice();
            if (!hasActiveDevice) return; // Prevent making API calls if no device is found

            await axios.post(
                `https://api.spotify.com/v1/me/player/${type}`,
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const response = await axios.get(
                "https://api.spotify.com/v1/me/player/currently-playing",
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data && response.data.item) {
                const { item } = response.data;
                const currentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2]?.url || "", 
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
            } else {
                dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
            }
        } catch (error) {
            console.error("Error changing track:", error);
        }
    };

    const togglePlayPause = async () => {
        try {
            const hasActiveDevice = await checkActiveDevice();
            if (!hasActiveDevice) return;

            const url = `https://api.spotify.com/v1/me/player/${playerState ? "pause" : "play"}`;
            await axios.put(
                url,
                {}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
        } catch (error) {
            console.error("Error toggling play/pause:", error);
        }
    };

    return (
        <div className="playerContainer">
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="previous">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="state" onClick={togglePlayPause}> 
                {playerState ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </div>
    );
}
