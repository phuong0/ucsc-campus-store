import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Project from "./pages/Project";
import File from "./pages/File"


import React, { useState } from "react";

// pages that you can navigate to

export const Switch = ({userid, login, logout}) => {
    const [authenticated, setAuthenticated] = useState(userid !== null);

    const handlelogin = (temp) => {
        login(temp);
        setAuthenticated(true);
    };

    const handlelogout = () => {
        logout();
        setAuthenticated(false);
    };

    console.log("switch userid: " + userid);

    return (
        <Router>
            <Routes>
                <Route path="/signin" element={<SignIn login={handlelogin} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Navigate to="/signin" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/files" element={<File />} />
            </Routes>
        </Router>
    );
}