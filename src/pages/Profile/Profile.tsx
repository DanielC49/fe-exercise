import { useContext, useEffect, useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { ProfileContext } from "../../context/ProfileContext";

import "./Profile.css";
import PostList from "../../components/PostList/PostList";
import { PostType } from "../../components/Post/Post";
import Header from "../../components/Header/Header";
import { EditPostType } from "../../App";
import { Navigate } from "react-router-dom";

export default function Profile({ setOpen, isOpen, setModalEditPost, editPost }: {
    // Sets whether the publish post modal is open or not.
    setOpen: (value: React.SetStateAction<boolean>) => void,
    // Whether the publish post modal is open.
    isOpen: boolean,
    // Open modal to edit post with initial post data.
    setModalEditPost: (postData: null | EditPostType) => void,
    // Data of the post to be edited, or null if no post is being edited.
    editPost: null | EditPostType
}) {
    const { profile } = useContext(ProfileContext);

    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!profile)
        return <Navigate to="/login" />;

    // Initial load of posts.
    useEffect(() => {
        loadPosts();
    }, []);

    /**
     * Fetches and loads the profile's posts in chronological order.
     */
    function loadPosts() {
        if (!profile) return;

        fetch(`http://localhost:5000/posts?userId=${profile.id}&_embed=user`)
            .then(res => res.json())
            .then((result: Array<PostType>) => {
                setPosts(result);
                setIsLoading(false);
            }).catch(err => {
                setIsLoading(false);
                console.error(err);
            });
    }

    return <>
        <Header loadPosts={loadPosts} editPost={editPost} isOpen={isOpen} setModalEditPost={setModalEditPost} setOpen={setOpen} />
        {isLoading ? <div>Loading...</div> : (
            <div className="main pb">
                {/* Profile avatar, name and e-mail */}
                <div className="top">
                    <Avatar large={true} src={"/avatars/" + profile.avatar} />
                    <div>
                        <div className="name">{profile.firstName + " " + profile.lastName}</div>
                        <div className="email">{profile.email}</div>
                    </div>
                </div>

                {/* Profile posts */}
                <h2>Posts ({posts.length})</h2>
                <PostList loadPosts={loadPosts} setModalEditPost={setModalEditPost} posts={posts} />
            </div>
        )}
    </>;
}