import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AuthContextProvider } from "./context/AuthContext.tsx";

function TokenInterceptor(config: InternalAxiosRequestConfig<any>) {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}

axios.interceptors.request.use(TokenInterceptor);

createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
