import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

export default function RutaProtegida({ children }) {
  const { isAuthenticated } = useContext(CarritoContext);

  if (!isAuthenticated) {
    return (
      <>
        {console.log("Ruta protegida: usuario no autenticado")}
        <Navigate to="/React-TalentoTech/login" replace />
      </>
    );
  }

  return (
    <>
      {console.log("Ruta protegida: usuario autenticado")}
      {children}
    </>
  );
}