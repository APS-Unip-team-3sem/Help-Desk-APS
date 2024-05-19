import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    userType: 'ADMIN' | 'USER' | null;
    login: () => void;
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

    const login = () => {
        // lógica de login
        setIsAuthenticated(true);
    };

    const logout = () => {
        // lógica de logout
        setIsAuthenticated(false);
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