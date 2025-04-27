import React from "react";
import "./Login.css";

export default function Login() {
  const handleClick = () => {
    const clientId = "9265158cdae64b668aa82420be298ba7";
    const redirectUrl = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played"
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${encodeURIComponent(scope.join(" "))}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="container">
    <div className="login-container">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="Spotify Logo"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </div>
    </div>
  );
}
