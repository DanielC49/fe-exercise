import { useContext } from "react";
import { Profile, ProfileContext } from "../../context/ProfileContext";
import Avatar from "../Avatar/Avatar";

import "./Post.css";
import { EditPostType } from "../../App";

export interface PostType {
    id: string;
    userId: string;
    postedAt: Date;
    title: string;
    text: string;
    user: Profile;
}

export default function Post({ post, setModalEditPost, postUpdated }: {
    post: PostType,
    setModalEditPost: (postData: null | EditPostType) => void,
    postUpdated: () => void
}) {
    const { profile } = useContext(ProfileContext);

    const dateDiff = new Date().getTime() - new Date(post.postedAt).getTime();

    function ago(diff: number): string {
        if (diff < 60 * 1000)
            return "Now";
        else if (diff < 60 * 60 * 1000)
            return Math.round(diff / 60 / 1000) + " min ago";
        else if (diff < 24 * 60 * 60 * 1000)
            return Math.round(diff / 60 / 60 / 1000) + " hours ago";
        else if (diff < 30 * 24 * 60 * 60 * 1000)
            return Math.round(diff / 24 / 60 / 60 / 1000) + " days ago";
        else
            return Math.round(diff / 30 / 24 / 60 / 60 / 1000) + " mon ago";
    }

    function editPost(post: PostType) {
        setModalEditPost({
            id: post.id,
            title: post.title,
            content: post.text
        });
        postUpdated();
    }

    function deletePost(postId: string) {
        fetch("http://localhost:5000/posts/" + postId, {
            method: "DELETE"
        }).then((res) => {
            if (res.ok)
                postUpdated();
            else
                console.error(res);
        });
    }

    return <div className="post-container">
        <div className="post-header">
            <div className="post-header-section">
                <Avatar src={"/avatars/" + post.user.avatar} />
                {post.user.firstName + " " + post.user.lastName}
                <div className="sec">&bull;</div>
                <div className="ago">{ago(dateDiff)}</div>
                {dateDiff < 5 * 60 * 1000 && <div className="post-badge">New</div>}
            </div>
            {profile && post.userId == profile.id && <div className="post-header-section post-options">
                <button onClick={() => editPost(post)} className="post-header-button">
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="post-header-button">
                    <span onClick={() => deletePost(post.id)} className="material-symbols-outlined">delete</span>
                </button>
            </div>}
        </div>
        <div>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.text}</div>
        </div>
    </div>;
}