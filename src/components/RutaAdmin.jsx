import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function RutaAdmin({ children }) {
  const { isAuthenticated, isAdmin } = useContext(CarritoContext);

  if (!isAuthenticated || !isAdmin) {
    return (
      <>
        {console.log("Ruta de administrador: acceso denegado")}
        <Navigate to="/React-TalentoTech/cliente" replace />
      </>
    );
  }

  return (
    <>
      {console.log("Ruta de administrador: acceso permitido")}
      {children}
    </>
  );
}