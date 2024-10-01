import { useState } from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setError(getError());

        if (error)
            return;

        const accounts: Array<any> = await (fetch(`http://localhost:5000/users?email=${email}&password=${password}`).then(res => res.json()));

        if (accounts.length == 1) {
            localStorage.setItem("accountId", accounts[0].id);
            navigate("profile");
        } else {
            setError("E-mail or password is incorrect.");
        }
    }

    function getError(): string {
        if (email === "")
            return "Please enter an e-mail."
        else if (password === "")
            return "Please enter the password.";
        else
            return "";
    }

    return <div className="wrapper">
        <div className="container">
            <h1 className="title">Login</h1>
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
                <div className="error-msg">{error}</div>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
}