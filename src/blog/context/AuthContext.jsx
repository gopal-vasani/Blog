import React, { createContext, useMemo, useState } from "react";
  
  export const AuthContext = createContext({ isAuthenticated: false, currentUser: null, signup: () => {}, login: () => {}, logout: () => {} });
  
  export function AuthProvider({ children }) {
    // Persist users and current user in localStorage
    const [users, setUsers] = useState(() => {
      try {
        const raw = localStorage.getItem("users");
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    });
    const [currentUser, setCurrentUser] = useState(() => {
      try {
        const raw = localStorage.getItem("currentUser");
        return raw ? JSON.parse(raw) : null;
      } catch {
        return null;
      }
    });

    const isAuthenticated = !!currentUser;

    function persist(nextUsers, nextCurrentUser) {
      try {
        localStorage.setItem("users", JSON.stringify(nextUsers));
        if (nextCurrentUser) localStorage.setItem("currentUser", JSON.stringify(nextCurrentUser));
        else localStorage.removeItem("currentUser");
      } catch {}
    }

    function signup(username, password) {
      if (!username || !password) throw new Error("Username and password required");
      const exists = users.some((u) => u.username === username);
      if (exists) throw new Error("User already exists");
      const nextUsers = [...users, { username, password }];
      setUsers(nextUsers);
      setCurrentUser({ username });
      persist(nextUsers, { username });
    }

    function login(username, password) {
      const match = users.find((u) => u.username === username && u.password === password);
      if (!match) throw new Error("Invalid credentials");
      setCurrentUser({ username: match.username });
      persist(users, { username: match.username });
    }

    function logout() {
      setCurrentUser(null);
      persist(users, null);
    }

    const value = useMemo(
      () => ({ isAuthenticated, currentUser, signup, login, logout }),
      [isAuthenticated, currentUser, users]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }
