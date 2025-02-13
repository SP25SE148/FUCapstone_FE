"use client"

import { toast } from 'sonner';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface User {
    name: string;
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

interface DecodedToken extends User {
    iss: string;
    aud: string;
    exp: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Kiểm tra localStorage khi component mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode<DecodedToken>(storedToken);
                // Kiểm tra xem token đã hết hạn chưa
                if (decodedToken.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setUser({
                        name: decodedToken.name,
                        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
                    });
                } else {
                    // Token đã hết hạn, xóa khỏi localStorage
                    setUser(null);
                    setToken(null);
                    localStorage.removeItem('token');
                    router.push("/");
                    toast.info("Session is expired.", {
                        description: "Please sign in to continue"
                    })
                }
            } catch (error) {
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
                router.push("/");
                toast.error("Something wrong please try again later")
            }
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch('https://localhost:8000/identity/Auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Email or Password invalid`);
            }

            const data = await response.json();
            const decodedToken = jwtDecode<DecodedToken>(data.accessToken);

            setToken(data.accessToken);
            setUser({
                name: decodedToken.name,
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
                "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            });

            // Lưu thông tin vào localStorage
            localStorage.setItem('token', data.accessToken);
            // Điều hướng sau khi đăng nhập thành công
            switch (decodedToken?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]) {
                case "SuperAdmin":
                    router.push("/superadmin");
                    break;
                case "Admin":
                    router.push("/admin");
                    break;
                case "Manager":
                    router.push("/manager");
                    break;
                case "Supervisor":
                    router.push("/supervisor/home");
                    break;
                case "Student":
                    router.push("/student/home");
                    break;
                default:
                    break;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        const accessToken = localStorage.getItem('token');
        try {
            const response = await fetch('https://localhost:8000/identity/Auth/token/revoke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken }),
            });

            if (!response.ok) {
                throw new Error(`Invoke token fail.`);
            }
        } catch (error) {
            throw error;
        }
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        router.push("/");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};