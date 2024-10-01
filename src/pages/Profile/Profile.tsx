import { useContext, useEffect, useState } from "react";
import Avatar from "../../components/Avatar/Avatar";
import { ProfileContext } from "../../context/ProfileContext";

import "./Profile.css";
import PostList from "../../components/PostList/PostList";
import { PostType } from "../../components/Post/Post";

export default function Profile() {
    const { profile } = useContext(ProfileContext);

    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (!profile)
        return "";

    useEffect(() => {
        fetch(`http://localhost:5000/posts?userId=${profile.id}&_embed=user`).then(res => res.json()).then((result: Array<PostType>) => {
            setPosts(result);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
        });
    }, []);

    return (
        isLoading ? <div>Loading...</div> : (
            <div className="main">
                <div className="top">
                    <Avatar large={true} src={"../../public/avatars/" + profile.avatar} />
                    <div>
                        <div className="name">{profile.firstName + " " + profile.lastName}</div>
                        <div className="email">{profile.email}</div>
                    </div>
                </div>
                <h2>Posts ({posts.length})</h2>
                <PostList posts={posts} />
            </div>
        )
    );
}