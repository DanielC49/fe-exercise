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
    setOpen: (value: React.SetStateAction<boolean>) => void,
    isOpen: boolean,
    setModalEditPost: (postData: null | EditPostType) => void,
    editPost: null | EditPostType
}) {
    const { profile } = useContext(ProfileContext);

    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!profile)
        return <Navigate to="/login" />;

    useEffect(() => {
        postUpdated();
    }, []);

    function postUpdated() {
        if (!profile) return;

        fetch(`http://localhost:5000/posts?userId=${profile.id}&_embed=user`).then(res => res.json()).then((result: Array<PostType>) => {
            setPosts(result);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
        });
    }

    return <>
        <Header postUpdated={postUpdated} editPost={editPost} isOpen={isOpen} setModalEditPost={setModalEditPost} setOpen={setOpen} />
        {isLoading ? <div>Loading...</div> : (
            <div className="main pb">
                <div className="top">
                    <Avatar large={true} src={"/avatars/" + profile.avatar} />
                    <div>
                        <div className="name">{profile.firstName + " " + profile.lastName}</div>
                        <div className="email">{profile.email}</div>
                    </div>
                </div>
                <h2>Posts ({posts.length})</h2>
                <PostList postUpdated={postUpdated} setModalEditPost={setModalEditPost} posts={posts} />
            </div>
        )}
    </>;
}