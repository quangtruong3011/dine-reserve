import { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/AuthService";

export const AuthContext = createContext();

const authService = new AuthService();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = sessionStorage.getItem('token');
                if (token) {
                    const response = await authService.getUser();
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkUser();
    }, []);

    const login = async (data) => {
        try {
            const response = await authService.login(data);
            sessionStorage.setItem('token', response.data.data.token);
            setUser(response.data.data);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login,
            logout,
            isLoading,
        }}>
            {children}
        </AuthContext.Provider>
    );
};