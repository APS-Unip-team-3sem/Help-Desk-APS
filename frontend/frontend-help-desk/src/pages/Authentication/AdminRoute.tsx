import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({ element, tipoUsuario, ...rest }: { element: React.ReactNode, tipoUsuario: string, [key: string]: any }) => {
    // Verifica se o tipo de usuário é "ADMIN"
    if (tipoUsuario === 'ADMIN') {
        // Se for "ADMIN", renderiza o componente da rota
        return <Route {...rest} element={element} />;
    } else {
        // Se não for "ADMIN", redireciona para uma página de acesso negado
        return <Navigate to="/access-denied" />;
    }
};

export default AdminRoute;