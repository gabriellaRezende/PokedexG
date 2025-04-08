//Gerencia o estado do login do usuário
// e fornece funções para login e logout
// para que possam ser usadas em qualquer parte do aplicativo.

import { createContext, useContext, useState } from "react";

type AuthContextType = {
    isUserLoggedIn: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const login = () => setIsUserLoggedIn(true);

    const logout = () => setIsUserLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, login, logout }}>
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