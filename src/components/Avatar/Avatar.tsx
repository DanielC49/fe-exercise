import "./Avatar.css";

export default function Avatar({ src, large }: { src: string, large?: boolean }) {
    return <img className={"avatar " + (large ? "large" : "")} src={src} alt="Avatar" />;
}