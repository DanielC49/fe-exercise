import "./Avatar.css";

export default function Avatar({ src, large }: { src: string, large?: boolean }) {
    // "Large" is for profile page
    return <img className={"avatar " + (large ? "large" : "")} src={src} alt="Avatar" />;
}