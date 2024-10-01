import { useContext } from "react";
import { ProfileContext, ProfileProvider } from "./context/ProfileContext";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";

export default function App() {
    const { profile, loading } = useContext(ProfileContext);

    return (
        <ProfileProvider>
            <ProfileContext.Consumer>
                {({ loading, profile }) => (
                    loading ?
                        <div>Loading...</div> : (
                            <Router>
                                <Routes>

                                    <Route
                                        path="/"
                                        element=<Home />
                                    />

                                    <Route
                                        path="/login"
                                        element={profile ? <Navigate to="/profile" /> : <Login />}
                                    />

                                    <Route
                                        path="/profile"
                                        element={profile ? <Profile /> : <Navigate to="/login" />}
                                    />

                                </Routes>
                            </Router>
                        )
                )}
            </ProfileContext.Consumer>
        </ProfileProvider>
    );
}