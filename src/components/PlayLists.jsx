import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayLists() {
    const [{ token, playlists }, dispatch] = useStateProvider(); // Added playlists to state
    const [localPlaylists, setLocalPlaylists] = useState([]); // Local state to hold the playlists

    useEffect(() => {
        const getPlayListData = async () => {
            try {
                const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
                    headers: {
                        Authorization: 'Bearer ' + token, // Added space after Bearer
                    }
                });
                const { items } = response.data;

                const playlists = items.map(({ name, id }) => {
                    return { name, id };
                });

                // Dispatch to global state if needed
                dispatch({
                    type: reducerCases.SET_PLAYLISTS, playlists
                });

                // Optionally, you can store it in local state for immediate rendering
                setLocalPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching playlists", error);
            }
        };

        if (token) { // Only call if there's a token available
            getPlayListData();
        }

    }, [token, dispatch]); // Added dispatch to ensure it's not stale

    return (
        <div className="playlists-container">
            <div className="container-name">
                <h2>Your Playlists</h2>
            </div>
            <div className="playlists-list">
                {localPlaylists.map(({ name, id }) => {
                    return (
                        <div key={id} className="playlist-item">
                            <span>{name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
