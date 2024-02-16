import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import SignIn from './pages/SignIn';

// pages that you can navigate to

export const Switch = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/signin" />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
}