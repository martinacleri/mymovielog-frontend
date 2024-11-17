import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/welcomePage';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import HomePage from './pages/homePage';
import WatchlistList from './components/userWatchlist';
import LogList from './components/userLogs';
import { AuthProvider } from './context/authContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/watchlist" element={<WatchlistList />} />
                    <Route path="/logs" element={<LogList />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
