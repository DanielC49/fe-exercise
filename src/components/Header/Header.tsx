import { useContext } from "react";
import { ProfileContext } from "../../context/ProfileContext";

import "./Header.css";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import PostModal from "../PostModal/PostModal";
import { EditPostType } from "../../App";

export default function Header({ setOpen, isOpen, setModalEditPost, editPost, loadPosts: postUpdated }: {
    // Sets whether the publish post modal is open or not.
    setOpen?: (value: React.SetStateAction<boolean>) => void,
    // Whether the publish post modal is open.
    isOpen?: boolean,
    // Open modal to edit post with initial post data.
    setModalEditPost?: (postData: null | EditPostType) => void,
    // Data of the post to be edited, or null if no post is being edited.
    editPost?: null | EditPostType,
    // Update the posts list.
    loadPosts?: () => void
}) {
    const { profile, logout } = useContext(ProfileContext);

    return <>
        <div className="header">
            <div className="header-container">
                <div className="header-logo"><Link to="/">PostMania</Link></div>
                <div>
                    {/* If logged in show avatar, publish post and logout buttons */}
                    {profile && setModalEditPost ? (
                        <div className="header-profile">
                            {/* Profile button (avatar) */}
                            <Link to="/profile">
                                <Avatar src={"/avatars/" + profile.avatar} />
                            </Link>

                            {/* Publish post button */}
                            <button className="post-button" onClick={() => setModalEditPost(null)}>
                                <span className="material-symbols-outlined">edit</span> Post
                            </button>

                            {/* Logoout button */}
                            <button onClick={logout}>Logout</button>
                        </div>
                        // If not logged in show login button
                    ) : <Link to="/login"><button>Log in</button></Link>}
                </div>
            </div>
        </div>
        {/* Publish post modal */}
        {postUpdated && setOpen && editPost !== undefined && isOpen && <PostModal postUpdated={postUpdated} setOpen={setOpen} isOpen={isOpen} editPost={editPost} />}
    </>;
}