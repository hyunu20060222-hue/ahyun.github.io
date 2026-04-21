import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  username: string; // This will be the Nickname (Stage Name)
  email: string;
  name: string;
  phone: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, phone: string, nickname: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("haneul_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    const users = JSON.parse(localStorage.getItem("haneul_accounts") || "[]");
    const found = users.find((u: any) => u.email === email);
    
    // For mock purposes, let's treat any account with 'admin' in email or a specific one as admin
    const isAdmin = email.toLowerCase().includes('admin') || email === 'hyunu20060222@gmail.com';

    if (found) {
      const userData = { 
        username: found.nickname, 
        email: found.email,
        name: found.name,
        phone: found.phone,
        isAdmin
      };
      setUser(userData);
      localStorage.setItem("haneul_user", JSON.stringify(userData));
    } else {
      throw new Error("가입되지 않은 이메일이거나 비밀번호가 틀렸습니다.");
    }
  };

  const signup = async (name: string, phone: string, nickname: string, email: string, _password: string) => {
    const users = JSON.parse(localStorage.getItem("haneul_accounts") || "[]");
    if (users.find((u: any) => u.email === email)) {
      throw new Error("이미 가입된 이메일입니다.");
    }
    
    const isAdmin = email.toLowerCase().includes('admin') || email === 'hyunu20060222@gmail.com';

    const newUser = { 
      username: nickname, 
      email,
      name,
      phone,
      isAdmin
    };
    users.push({ ...newUser, nickname, password: _password });
    localStorage.setItem("haneul_accounts", JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem("haneul_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("haneul_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
