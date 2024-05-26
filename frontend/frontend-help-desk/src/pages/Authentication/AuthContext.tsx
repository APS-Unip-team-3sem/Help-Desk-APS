import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLoggedUser } from '../../api/userdata';
import { setAuthToken } from '../../api/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    userType: 'ADMIN' | 'USER' | null;
    login: (token: string) => void;
    logout: () => void;
    setUserType: (userType: 'ADMIN' | 'USER' | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState<'ADMIN' | 'USER' | null>(null);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
                try {
                    const user = await getLoggedUser(token);
                    setIsAuthenticated(true);
                    setUserType(user.tipo); // Assumindo que a resposta tenha um campo `tipo`
                } catch (error) {
                    console.error('Erro ao buscar usuário logado:', error);
                    logout();
                }
            }
        };

        initializeAuth();
    }, []);

    const login = (token: string) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        // initializeAuth();
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
        setUserType(null); // Limpar o tipo de usuário ao deslogar
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const setUserTypeHandler = (newUserType: 'ADMIN' | 'USER' | null) => {
        setUserType(newUserType);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userType, login, logout, setUserType: setUserTypeHandler }}>
            {children}
        </AuthContext.Provider>
    );
};