import { useState } from "react";
import "./Login.css"

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("login ", email, password);
    }

    return <div className="container">
        <h1>Login</h1>
        <form onSubmit={login}>
            <div className="field">
                <label htmlFor="email">
                    <div>E-mail</div>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                </label>
            </div>
            <div className="field">
                <label htmlFor="password">
                    <div>Password</div>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                </label>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
}