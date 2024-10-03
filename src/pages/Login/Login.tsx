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

        // Get errors
        const err = getError();
        setError(err);

        if (err)
            return;

        // Fetch and set profile
        fetch(`http://localhost:5000/users?email=${email}&password=${password}`)
            .then(res => res.json())
            .then(async (accounts: Array<any>) => {
                if (accounts.length == 1) { // Profile exists
                    localStorage.setItem("accountId", accounts[0].id);
                    setProfile(await getProfile());
                    setDone(true);
                } else { // Profile doesn't exist
                    setError("E-mail or password is incorrect.");
                }
            });
    }

    /**
     * Gets the current error.
     * @returns A string containing the error, or an empty string if there is no error.
     */
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

                    {/* E-mail */}
                    <div className="field">
                        <label>
                            <div>E-mail</div>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                        </label>
                    </div>

                    {/* Password */}
                    <div className="field">
                        <label>
                            <div>Password</div>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                        </label>
                    </div>

                    {/* Error message */}
                    <div className="error-msg">{error}</div>

                    {/* Login button */}
                    <button type="submit">Login</button>

                </form>
            </div>
            {/* Go to profile page when login is sucessful */}
            {done && <Navigate to="/profile" />}
        </div>
    </>
}