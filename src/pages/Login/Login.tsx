import { useContext, useState } from "react";
import "./Login.css"
import { Navigate } from "react-router-dom";
import { ProfileContext } from "../../context/ProfileContext";
import Header from "../../components/Header/Header";

export default function Login() {
    const { setProfile, getProfile } = useContext(ProfileContext);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [done, setDone] = useState<boolean>(false);

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const err = getError();
        setError(err);

        if (err)
            return;

        const accounts: Array<any> = await (fetch(`http://localhost:5000/users?email=${email}&password=${password}`).then(res => res.json()));

        if (accounts.length == 1) {
            localStorage.setItem("accountId", accounts[0].id);
            setProfile(await getProfile());
            setDone(true);
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

    return <>
        <Header />
        <div className="wrapper">
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
            {done && <Navigate to="/profile" />}
        </div>
    </>
}