import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { CarritoProvider } from "./context/CarritoProvider.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { AdminProvider } from "./context/AdminProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <CarritoProvider>
        <AdminProvider>
          <AuthProvider>
            <App />
            <ToastContainer />
          </AuthProvider>
        </AdminProvider>
      </CarritoProvider>
    </Router>
  </StrictMode>
);
