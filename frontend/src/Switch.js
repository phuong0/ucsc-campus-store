import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Project from "./pages/Project";
import File from "./pages/File"

// pages that you can navigate to

export const Switch = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/signin" />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/files" element={<File />} />
            </Routes>
        </Router>
    );
}