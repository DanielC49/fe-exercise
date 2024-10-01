import Post, { PostType } from "../Post/Post";
import "./PostList.css";

export default function Avatar({ posts }: { posts: Array<PostType> }) {
    return <div className="post-list">
        {
            posts.map((post, index) =>
                <Post post={post} key={index} />
            )
        }
    </div>
}