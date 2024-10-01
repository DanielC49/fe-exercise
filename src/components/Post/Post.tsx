import { Profile } from "../../context/ProfileContext";
import Avatar from "../Avatar/Avatar";
import "./Post.css";

export interface PostType {
    userId: string;
    postedAt: Date;
    title: string;
    text: string;
    user: Profile;
}

export default function Post({ post }: { post: PostType }) {
    return <div className="post-container">
        <div className="post-header">
            <Avatar src={"../../public/avatars/" + post.user.avatar} />
            {post.user.firstName + " " + post.user.lastName}
        </div>
        <div>
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.text}</div>
        </div>
    </div>;
}