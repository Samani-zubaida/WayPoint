import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL; // your backend URL
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Set Axios header globally whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Check auth on app load
  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;

      const { data } = await axios.get("/api/users/check-auth");
      console.log("data",data.success);
      if(data.success) {
         setAuthUser(data.user);
        console.log("user = ",data.user);
        console.log("auth user is",authUser);
        console.log("succes data",data);
        setToken(storedToken); // ensure axios header is set
      }
    } catch (err) {
      console.log("Auth check error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Authentication failed");
      setAuthUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  // Login / signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/users/${state}`, credentials);

      if (data.success && data.token && data.user) {
        setAuthUser(data.user);
        console.log("login : ",authUser);
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(data.message || "Logged in successfully");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Logout
  const logout = () => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    checkAuth();
  }, []);
  
  console.log("final check",authUser);
  const value = {
    authUser,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};