import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [user, setUser] = useState(null);
 
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const savedUser = localStorage.getItem('user');

        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                setUser(savedUser ? JSON.parse(savedUser) : null);
            } catch (error) {
                console.error("Error parsing savedUser:", error);
                setUser(null);
            }
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));

            setIsAuthenticated(true);
            setAuthToken(token);
            setUser(user);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            return true;
        } catch (error) {
            console.error('Error during login:', error.message);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setAuthToken(null);
        setUser(null);

        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, authToken, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
    }
    return context;
};