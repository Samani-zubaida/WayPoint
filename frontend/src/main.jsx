import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/authContext.jsx";
import { ChatProvider } from "./Context/ChatContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // ✅ THIS WAS MISSING
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ChatProvider>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
      </ChatProvider>
    </AuthProvider>
  </BrowserRouter>
)


