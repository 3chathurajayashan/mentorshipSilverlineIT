import { createContext, useContext, useState } from "react";

import { signinUser, signupUser } from "../APIS/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("mentorship_user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() =>
    localStorage.getItem("mentorship_token"),
  );

  const [loading, setLoading] = useState(false);

  // Save authentication details
  const saveAuth = (response) => {
    const newToken = response?.token || response?.accessToken;
    const newUser = response?.user;

    if (!newToken) {
      throw new Error("Login response does not contain a JWT token.");
    }

    if (!newUser) {
      throw new Error("Login response does not contain user details.");
    }

    localStorage.setItem("mentorship_token", newToken);
    localStorage.setItem("mentorship_user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  // Signup

  const signup = async (userData) => {
    setLoading(true);

    try {
      const response = await signupUser(userData);

      // Automatically authenticate after successful signup
      saveAuth(response);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // Signin
  const login = async (loginData) => {
    setLoading(true);

    try {
      const response = await signinUser(loginData);

      saveAuth(response);

      return response;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("mentorship_token");
    localStorage.removeItem("mentorship_user");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token && user);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
