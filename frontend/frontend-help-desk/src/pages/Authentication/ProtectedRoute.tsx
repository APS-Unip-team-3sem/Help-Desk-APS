import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
    path: string;
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ path, element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/signin" replace />
    );
};

export default ProtectedRoute;