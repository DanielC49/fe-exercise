import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import { PostType } from "../../components/Post/Post";
import Header from "../../components/Header/Header";

import "./Home.css";
import { EditPostType } from "../../App";

export default function Home({ setOpen, isOpen, setModalEditPost, editPost }: {
    setOpen: (value: React.SetStateAction<boolean>) => void,
    isOpen: boolean,
    setModalEditPost: (postData: null | EditPostType) => void,
    editPost: null | EditPostType
}) {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        postUpdated();
    }, []);

    function postUpdated() {
        console.log(2)
        fetch(`http://localhost:5000/posts?_embed=user&_sort=-postedAt`).then(res => res.json()).then((result: Array<PostType>) => {
            setPosts(result);
            setIsLoading(false);
        }).catch(err => {
            setIsLoading(false);
            console.error(err);
        });
    }

    return <>
        <Header postUpdated={postUpdated} editPost={editPost} setModalEditPost={setModalEditPost} isOpen={isOpen} setOpen={setOpen} />
        <div className="main pb">
            {isLoading ? <div>Loading...</div> :
                <PostList postUpdated={postUpdated} setModalEditPost={setModalEditPost} posts={posts} />
            }
        </div>
    </>;
}