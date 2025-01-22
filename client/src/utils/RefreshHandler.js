import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const RefreshHandler = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore(); // Access Zustand store

    useEffect(() => {
        if (isLoggedIn()) {
            // Redirect from login/home to dashboard if authenticated
            if (window.location.pathname === '/' || window.location.pathname === '/login') {
                navigate('/dashboard', { replace: true });
            }
        } else {
            // Redirect to login if unauthenticated
            if (window.location.pathname === '/dashboard') {
                navigate('/login', { replace: true });
            }
        }
    }, [isLoggedIn, navigate]);

    return null;
}

export default RefreshHandler;
