import React, { useEffect } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      if (!token || !selectedPlaylistId) return;

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Playlist Data:", response.data);

        const selectedPlaylist = {
          id: response.data.id,
          name: response.data.name,
          description: response.data.description?.startsWith("<a")
            ? ""
            : response.data.description || "",
          image: response.data.images?.[0]?.url,
          tracks:
            response.data.tracks.items?.map(({ track }) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map((artist) => artist.name),
              image: track.album.images?.[2]?.url,
              duration: track.duration_ms,
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
            })) || [],
        };

        dispatch({
          type: "SET_PLAYLIST",
          selectedPlaylist: selectedPlaylist,
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };

    getInitialPlaylist();
  }, [selectedPlaylistId, token, dispatch]);

  const [{ selectedPlaylist }] = useStateProvider();

  const msToMinutesAndSecons = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <div className="bodyPlaylist" headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img src={selectedPlaylist.image} alt="Playlist Cover" />
            </div>
            <div className="details">
              <span className="type">PLAYLIST</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div
              className="header__row"
              style={{
                backgroundColor: headerBackground
                  ? "rgba(0,0,0,0.7)"
                  : "transparent",
                transition: "background-color 0.3s ease-in-out",
                marginTop: "20px",
              }}
            >
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>TITLE</span>
              </div>
              <div className="col">
                <span>ALBUM</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div className="row" key={id}>
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="" />
                        </div>
                        <div className="info">
                          <div className="name">{name}</div>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        <span>{album}</span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSecons(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
