import { useEffect, useState } from "react";
import PostList from "../../components/PostList/PostList";
import { PostType } from "../../components/Post/Post";
import Header from "../../components/Header/Header";

import { EditPostType } from "../../App";

export default function Home({ setOpen, isOpen, setModalEditPost, editPost }: {
    // Sets whether the publish post modal is open or not.
    setOpen: (value: React.SetStateAction<boolean>) => void,
    // Whether the publish post modal is open.
    isOpen: boolean,
    // Open modal to edit post with initial post data.
    setModalEditPost: (postData: null | EditPostType) => void,
    // Data of the post to be edited, or null if no post is being edited.
    editPost: null | EditPostType
}) {
    const [posts, setPosts] = useState<Array<PostType>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Initial load of posts
    useEffect(() => {
        loadPosts();
    }, []);

    /**
     * Fetches and loads all posts.
     */
    function loadPosts() {
        fetch(`http://localhost:5000/posts?_embed=user&_sort=-postedAt`)
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
        <Header loadPosts={loadPosts} editPost={editPost} setModalEditPost={setModalEditPost} isOpen={isOpen} setOpen={setOpen} />
        <div className="main pb">
            {/* Posts list */}
            {isLoading ? <div>Loading...</div> :
                <PostList loadPosts={loadPosts} setModalEditPost={setModalEditPost} posts={posts} />
            }
        </div>
    </>;
}