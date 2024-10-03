import { useContext, useState } from "react";
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

export interface EditPostType {
    id: string;
    title: string;
    content: string;
}

export default function App() {
    const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<null | EditPostType>(null);

    function setModalEditPost(postData: null | EditPostType): void {
        setPostModalOpen(true);
        setEditPost(postData);
    }

    return (
        <ProfileProvider>
            <ProfileContext.Consumer>
                {({ loading, profile }) => (
                    loading ?
                        <div>Loading...</div> : (
                            <Router>
                                <Routes>

                                    // Home page
                                    <Route
                                        path="/"
                                        element=<Home editPost={editPost} setModalEditPost={setModalEditPost} isOpen={postModalOpen} setOpen={setPostModalOpen} />
                                    />

                                    //  Login page
                                    <Route
                                        path="/login"
                                        element={profile ? <Navigate to="/profile" /> : <Login />}
                                    />

                                    // Profile page
                                    <Route
                                        path="/profile"
                                        element={profile ? <Profile editPost={editPost} setModalEditPost={setModalEditPost} isOpen={postModalOpen} setOpen={setPostModalOpen} /> : <Navigate to="/login" />}
                                    />

                                </Routes>
                            </Router>
                        )
                )}
            </ProfileContext.Consumer>
        </ProfileProvider>
    );
}