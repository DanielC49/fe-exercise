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

export default function Post({ post, setModalEditPost, loadPosts }: {
    // The post to render.
    post: PostType,
    // Open modal to edit post with initial post data.
    setModalEditPost: (postData: null | EditPostType) => void,
    // Update the posts list.
    loadPosts: () => void
}) {
    const { profile } = useContext(ProfileContext);

    // Difference between today and the post's posted date
    const dateDiff = new Date().getTime() - new Date(post.postedAt).getTime();

    /**
     * Determines how long ago a date is.
     * @param diff the difference in milliseconds between two dates.
     * @returns A string of how long ago the date is.
     */
    function ago(diff: number): string {
        if (diff < 60 * 1000) // Less than 1 minute
            return "Now";
        else if (diff < 60 * 60 * 1000) // Less than 1 hour
            return Math.round(diff / 60 / 1000) + " min ago";
        else if (diff < 24 * 60 * 60 * 1000) // Less than 24 hours (1 day)
            return Math.round(diff / 60 / 60 / 1000) + " hours ago";
        else if (diff < 30 * 24 * 60 * 60 * 1000) // Less than 30 days (1 month)
            return Math.round(diff / 24 / 60 / 60 / 1000) + " days ago";
        else // 30 days or more
            return Math.round(diff / 30 / 24 / 60 / 60 / 1000) + " mon ago";
    }

    /**
     * Edits a post.
     * @param post New post data (title and content/text) and ID.
     */
    function editPost(post: PostType) {
        setModalEditPost({
            id: post.id,
            title: post.title,
            content: post.text
        });

        // Update the posts list.
        loadPosts();
    }

    /**
     * Deletes a post by its ID.
     * @param postId The post ID.
     */
    function deletePost(postId: string) {
        fetch("http://localhost:5000/posts/" + postId, { method: "DELETE" })
            .then((res) => {
                if (res.ok)
                    loadPosts(); // Update the posts list.
                else
                    console.error(res);
            });
    }

    return <div className="post-container">
        {/* Post header */}
        <div className="post-header">

            <div className="post-header-section">
                <Avatar src={"/avatars/" + post.user.avatar} />
                {post.user.firstName + " " + post.user.lastName}
                <div className="sec">&bull;</div>
                <div className="ago">{ago(dateDiff)}</div>
                {dateDiff < 5 * 60 * 1000 && <div className="post-badge">New</div>}
            </div>

            {profile && post.userId == profile.id && <div className="post-header-section post-options">

                {/* Edit post button */}
                <button onClick={() => editPost(post)} className="post-header-button">
                    <span className="material-symbols-outlined">edit</span>
                </button>

                {/* Delete post button */}
                <button onClick={() => deletePost(post.id)} className="post-header-button">
                    <span className="material-symbols-outlined">delete</span>
                </button>

            </div>}

        </div>

        {/* Post body */}
        <div>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.text}</div>
        </div>
    </div>;
}