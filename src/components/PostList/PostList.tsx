import { EditPostType } from "../../App";
import Post, { PostType } from "../Post/Post";
import "./PostList.css";

export default function PostList({ posts, setModalEditPost, loadPosts }: {
    // List of posts to render.
    posts: Array<PostType>,
    // Open modal to edit post with initial post data.
    setModalEditPost: (postData: null | EditPostType) => void,
    // Update the posts list.
    loadPosts: () => void
}) {
    return <div className="post-list">
        {
            posts.map(post =>
                <Post loadPosts={loadPosts} setModalEditPost={setModalEditPost} post={post} key={post.id} />
            )
        }
    </div>
}