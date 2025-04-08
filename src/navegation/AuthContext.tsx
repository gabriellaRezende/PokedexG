//Gerencia o estado do login do usuário
// e fornece funções para login e logout
// para que possam ser usadas em qualquer parte do aplicativo.

import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isUserLoggedIn: boolean;
    userId: number | null;
    login: (id: number) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    const login = (id: number) => {
        setIsUserLoggedIn(true);
        setUserId(id);
    }; 

    const logout = () => {
        setUserId(null);
        setIsUserLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};