import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";

import "./Header.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";

export default function Header() {
    const { profile, logout } = useContext(ProfileContext);

    return <div className="header">
        <div className="header-container">
            <div className="header-logo"><Link to="/">PostMania</Link></div>
            <div>
                {profile ? (
                    <div className="header-profile">
                        <Link to="/profile"><Avatar src={"/avatars/" + profile.avatar} /></Link>
                        <button>Post</button>
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : <Link to="/login"><button>Log in</button></Link>}
            </div>
        </div>
    </div>;
}