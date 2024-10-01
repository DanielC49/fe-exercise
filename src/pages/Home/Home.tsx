import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import { PostType } from "../../components/Post/Post";
import Header from "../../components/Header/Header";

import "./Home.css";

export default function Home() {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch(`http://localhost:5000/posts?_embed=user`).then(res => res.json()).then((result: Array<PostType>) => {
            setPosts(result);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
        });
    }, []);

    return <>
        <Header />
        <div className="main posts">
            <PostList posts={posts} />
        </div>
    </>;
}