import { useContext, useEffect, useState } from "react";
import "./PostModal.css";
import { ProfileContext } from "../../context/ProfileContext";
import { EditPostType } from "../../App";

export default function PostModal({ setOpen, isOpen, editPost, postUpdated }:
    {
        setOpen: (value: React.SetStateAction<boolean>) => void,
        isOpen: boolean,
        editPost: null | EditPostType,
        postUpdated: () => void
    }) {
    const { profile } = useContext(ProfileContext);

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [errors, setErrors] = useState<{ title: string, content: string }>({ title: "", content: "" });
    const [contentCharCount, setContentCharCount] = useState<number>(0);

    // If is editing a post, populate inputs with data on first render.
    useEffect(() => {
        if (editPost) {
            setTitle(editPost.title);
            setContent(editPost.content);
        }
    }, []);

    /**
     * Publish a new post or edit an existing one.
     * @param e The form submit event.
     */
    function publishPost(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();

        // Get and set errors
        const errors = getErrors();
        setErrors(errors);

        // Cancel publishing post if there are errors
        if (errors.title || errors.content)
            return;

        if (editPost) { // Edit existing post
            fetch("http://localhost:5000/posts/" + editPost.id, {
                method: "PATCH",
                body: JSON.stringify({
                    title,
                    text: content
                })
            }).then(res => {
                if (res.ok) {
                    setOpen(false);
                    postUpdated();
                } else {
                    console.error(res);
                }
            });

        } else { // Publish new post
            fetch("http://localhost:5000/posts", {
                method: "POST",
                body: JSON.stringify({
                    userId: profile?.id,
                    // Transform date to ISO date without milliseconds
                    postedAt: new Date().toISOString().slice(0, -5) + "Z",
                    title,
                    text: content
                })
            }).then(res => {
                if (res.ok) {
                    setOpen(false);
                    postUpdated();
                } else {
                    console.error(res);
                }
            });
        }
    }

    /**
     * 
     * @param e 
     */
    function contentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setContent(e.target.value)
        setContentCharCount(e.target.value.length);
    }

    /**
     * Gets the current errors.
     * @returns An object containing the error for each field. If the field has no error then the value is an empty string.
     */
    function getErrors() {
        const errors = { title: "", content: "" };

        if (title === "")
            errors.title = "Title is missing.";
        else if (title.length < 3)
            errors.title = "Title must include at least 3 characters.";
        else if (title.length > 50)
            errors.title = "Title cannot include more than 50 characters.";

        if (content === "")
            errors.content = "Content is missing.";
        else if (content.length < 5)
            errors.content = "Content must include at least 5 characters.";
        else if (content.length > 300)
            errors.content = "Content cannot include more than 300 characters.";

        return errors;
    }

    return <div className={"modal-bg " + (isOpen ? "fade-in" : "fade-out")}>
        <div className="post-modal">
            <div className="post-modal-header">
                <h2 className="title">Post</h2>

                {/* Close button (cancels the publish/edit) */}
                <button onClick={() => setOpen(false)} className="close-post-modal">
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
            <form onSubmit={publishPost}>

                {/* Title field */}
                <div className="field">
                    <label className={errors.title ? "field-error" : ""}>
                        <div>Title</div>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" />
                    </label>
                    <div className="error-msg">{errors.title}</div>
                </div>

                {/* Content/Text field */}
                <div className="field">
                    <label className={errors.content ? "field-error" : ""}>
                        <div>Content</div>
                        <textarea rows={5} value={content} onChange={e => contentChange(e)} />
                    </label>
                    <div className={"char-count " + (contentCharCount > 300 ? "field-error" : "")}>{contentCharCount} / 300</div>
                    <div className="error-msg">{errors.content}</div>
                </div>

                {/* Publish/Save button */}
                <button className="button-primary" type="submit">{editPost ? "Save" : "Publish"}</button>

            </form>
        </div>
    </div>;
}