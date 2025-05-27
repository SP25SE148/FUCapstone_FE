"use client";

import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";

import React, { createContext, useState, useContext, useEffect } from "react";
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "@/utils/signalRService";
import { DecodedToken, User } from "@/types/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAccessToken: (
    accessToken: string,
    refreshToken: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
  accessToken?: string;
}> = ({ children, accessToken = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(accessToken);

  const mapDecodedTokenToUser = (decodedToken: DecodedToken): User => ({
    name: decodedToken.name,
    MajorId: decodedToken.MajorId,
    CampusId: decodedToken.CampusId,
    CapstoneId: decodedToken.CapstoneId,
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role":
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname":
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
      ],
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress":
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier":
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ],
  });

  const redirectToRole = (decodedToken: DecodedToken) => {
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    switch (role) {
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
        router.push("/");
        break;
    }
  };

  const handleSessionExpired = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");
    router.push("/");
    toast.info("Session expired", { description: "Please sign in again" });
  };

  const login = async (email: string, password: string) => {
    // const response = await fetch("https://localhost:8000/identity/Auth/login", {
    const response = await fetch(
      "https://fucapstone-be-gateway.onrender.com/identity/Auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();
    if (data?.isSuccess) {
      const decodedToken = jwtDecode<DecodedToken>(data.value.accessToken);
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.value),
      });
      setUser(mapDecodedTokenToUser(decodedToken));

      localStorage.setItem("token", data.value.accessToken);
      localStorage.setItem("refreshToken", data.value.refreshToken);
      localStorage.setItem(
        "refreshTokenExpiryTime",
        data.value.refreshTokenExpiryTime
      );

      await startSignalRConnection(data.value.accessToken);

      redirectToRole(decodedToken);

      toast.success("Login successful", { description: "Welcome to FUC" });

      // đang cho load lại trang để kết nối signalR, cần tìm giải pháp tối ưu hơn
      window.location.reload();
    } else {
      toast.error(data?.error?.message || "Login failed, please try again.");
    }
  };

  const refreshAccessToken = async (
    accessToken: string,
    refreshToken: string
  ) => {
    try {
      // const response = await fetch("https://localhost:8000/identity/Auth/token/refresh", {
      const response = await fetch(
        "https://fucapstone-be-gateway.onrender.com/identity/Auth/token/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, refreshToken }),
        }
      );

      const data = await response.json();

      if (data?.isSuccess) {
        await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data.value),
        });

        const decodedToken = jwtDecode<DecodedToken>(data.value.accessToken);
        setUser(mapDecodedTokenToUser(decodedToken));

        localStorage.setItem("token", data.value.accessToken);
        localStorage.setItem("refreshToken", data.value.refreshToken);
        localStorage.setItem(
          "refreshTokenExpiryTime",
          data.value.refreshTokenExpiryTime
        );
      } else {
        handleSessionExpired();
      }
    } catch (error) {
      handleSessionExpired();
    }
  };

  const logout = async () => {
    const accessToken = token;
    await stopSignalRConnection();

    // await fetch("https://localhost:8000/identity/Auth/token/revoke", {
    await fetch(
      "https://fucapstone-be-gateway.onrender.com/identity/Auth/token/revoke",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      }
    );
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpiryTime");

    router.push("/");
    toast.success("Sign Out successfully", { description: "See you again" });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const refreshTokenExpiryTime = localStorage.getItem(
      "refreshTokenExpiryTime"
    );

    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);

        // Kiểm tra refreshTokenExpiryTime có hết hạn chưa
        if (
          refreshTokenExpiryTime &&
          new Date(refreshTokenExpiryTime) <= new Date()
        ) {
          handleSessionExpired(); // Xóa token và yêu cầu đăng nhập lại
          return;
        }

        if (decodedToken?.exp * 1000 > Date.now()) {
          setToken(accessToken);
          setUser(mapDecodedTokenToUser(decodedToken));
        } else if (token && storedRefreshToken) {
          refreshAccessToken(token, storedRefreshToken);
        } else {
          handleSessionExpired();
        }
      } catch (error) {
        handleSessionExpired();
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
