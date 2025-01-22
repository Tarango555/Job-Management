// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore.js';

const ProtectedRoute = ({ children }) => {
    const token = useAuthStore(state => state.token);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
