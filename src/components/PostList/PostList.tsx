import { EditPostType } from "../../App";
import Post, { PostType } from "../Post/Post";
import "./PostList.css";

export default function PostList({ posts, setModalEditPost, postUpdated }: {
    posts: Array<PostType>,
    setModalEditPost: (postData: null | EditPostType) => void,
    postUpdated: () => void
}) {
    return <div className="post-list">
        {
            posts.map(post =>
                <Post postUpdated={postUpdated} setModalEditPost={setModalEditPost} post={post} key={post.id} />
            )
        }
    </div>
}