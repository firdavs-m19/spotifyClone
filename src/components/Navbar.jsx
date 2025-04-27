import React from "react";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";
import './Spotify.css';

export default function Navbar({ navBackground }) {
    const [{ userInfo }] = useStateProvider(); // ✅ Fix destructuring

    return (
        <div 
            className="navbarContainer"
            style={{ backgroundColor: navBackground ? "rgba(0,0,0,0.7)" : "transparent", transition: "background-color 0.3s ease-in-out" }} // ✅ Added smooth transition
        >
            <div className="search__bar">
                <FaSearch />
                <input type="text" placeholder="Artists, songs, or podcasts" />
            </div>
            <div className="avatar">
                <a href="#">
                    <CgProfile />
                    <span>{userInfo?.userName || "Guest"}</span> {/* ✅ Default value if userInfo is undefined */}
                </a>
            </div>
        </div>
    );
}
