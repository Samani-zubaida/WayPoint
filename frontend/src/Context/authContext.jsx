import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.VITE_BACKEND_URL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  // Set Authorization header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;

      const { data } = await axios.get(
        "/api/users/check-auth"
      );

      if (data.success) {
        setAuthUser(data.user);
        setToken(storedToken);
      }
    } catch (err) {
      console.log(
        "Auth check error:",
        err.response?.data || err.message
      );

      setAuthUser(null);
      setToken(null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common[
        "Authorization"
      ];

      toast.error(
        err.response?.data?.message ||
          "Authentication failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(
        `/api/users/${state}`,
        credentials
      );

      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);

        localStorage.setItem(
          "token",
          data.token
        );

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.token}`;

        toast.success(
          data.message ||
            "Logged in successfully"
        );
      } else {
        toast.error(
          data.message || "Login failed"
        );
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const logout = () => {
    setAuthUser(null);
    setToken(null);

    localStorage.removeItem("token");

    delete axios.defaults.headers.common[
      "Authorization"
    ];

    toast.success("Logged out successfully");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    authUser,
    token,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};