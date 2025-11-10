"use client";

import { useState, useEffect } from "react";
import { AuthResponse, LoginCredentials } from "../types/auth.types";
import { User } from "@/modules/core/types/user/user.types"; 

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
      }
    }
  }, []);

  const login = async (
    credentials: LoginCredentials
  ): Promise<AuthResponse<{ session: { access_token: string }; user: User }>> => { 
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse<{ session: { access_token: string }; user: User }> =
        await response.json();

      if (!response.ok) throw new Error(data.error || "Error al iniciar sesión");

      const accessToken = data.data?.session?.access_token;
      const userData = data.data?.user;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      
      if (userData) {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en login:", message);
      setError(message);
      return { success: false, code: 400, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("No hay token almacenado");

      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: AuthResponse = await response.json();

      if (!response.ok) throw new Error(data.error || "Error al cerrar sesión");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error en logout:", message);
      setError(message);
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      
      return { success: false, code: 400, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
    user,
    loading,
    error,
  };
};