import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayLists() {
  const [{ token, playlists }, dispatch] = useStateProvider();
  const [localPlaylists, setLocalPlaylists] = useState([]);

  useEffect(() => {
    const getPlayListData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        const { items } = response.data;

        const playlists = items.map(({ name, id }) => {
          return { name, id };
        });

        dispatch({
          type: reducerCases.SET_PLAYLISTS,
          playlists,
        });

        setLocalPlaylists(playlists);
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    if (token) {
      getPlayListData();
    }
  }, [token, dispatch]);

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
