import React from "react";
import { IoLibrary } from "react-icons/io5";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import PlayLists from './PlayLists'
export default function Sidebar() {
  return (
    <div className="sideBarContainer">
      <div className="top__links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="Spotify logo linking to the homepage"
          />
        </div>
        <ul>
          <li key="home">
            <MdHomeFilled size={20} />
            <span>Home</span>
          </li>
          <li key="search">
            <MdSearch size={20} />
            <span>Search</span>
          </li>
        </ul>
      </div>
      <PlayLists></PlayLists>
    </div>
  );
}
