import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";

import "./Header.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import PostModal from "../PostModal/PostModal";
import { EditPostType } from "../../App";

export default function Header({ setOpen, isOpen, setModalEditPost, editPost, postUpdated }: {
    setOpen: (value: React.SetStateAction<boolean>) => void,
    isOpen: boolean,
    setModalEditPost: (postData: null | EditPostType) => void,
    editPost: null | EditPostType,
    postUpdated: () => void
}) {
    const { profile, logout } = useContext(ProfileContext);

    return <>
        <div className="header">
            <div className="header-container">
                <div className="header-logo"><Link to="/">PostMania</Link></div>
                <div>
                    {profile ? (
                        <div className="header-profile">
                            <Link to="/profile"><Avatar src={"/avatars/" + profile.avatar} /></Link>
                            <button className="post-button" onClick={() => setModalEditPost(null)}>
                                <span className="material-symbols-outlined">edit</span> Post
                            </button>
                            <button onClick={logout}>Logout</button>
                        </div>
                    ) : <Link to="/login"><button>Log in</button></Link>}
                </div>
            </div>
        </div>
        {isOpen && <PostModal postUpdated={postUpdated} setOpen={setOpen} isOpen={isOpen} editPost={editPost} />}
    </>;
}