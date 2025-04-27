import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

const CurrentTrack = () => {
    const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

    useEffect(() => {
        const getCurrentTrack = async () => {
            if (!token) return; // ✅ Prevent API call if token is missing

            try {
                const response = await axios.get(
                    "https://api.spotify.com/v1/me/player/currently-playing",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                
                if(response.data !== ""){
                    const {item} = response.data
                    const currentlyPlaying = {
                        id: item.id,
                        name: item.name,
                        artists: item.artists.map((artist) => artist.name),
                        image: item.album.images[2].url,

                    }
                    dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
                }
                
            } catch (error) {
                console.error("Error fetching current track:", error);
            }
        };

        getCurrentTrack(); // ✅ Call the function

    }, [token]); // ✅ Added dependency array

    return <div>
        {
            currentlyPlaying && (
                <div className="track">
                    <div className="track__image">
                        <img src={currentlyPlaying.image} alt="" />
                    </div>
                    <div className="track__info">
                        <h4>
                            {currentlyPlaying.name}
                        </h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </div>;
};

export default CurrentTrack; // ✅ Ensure default export
