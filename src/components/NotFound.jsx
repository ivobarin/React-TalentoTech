import React from "react";
import { Link } from "react-router-dom";
import "./css/NotFound.css"; // Asegúrate de tener un archivo CSS para estilos
export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found">
        <h1>Página no encontrada</h1>
        <p>Lo sentimos, la página que buscas no existe.</p>
        <p>
          Puedes volver a la <Link to="/">página de inicio</Link>.
        </p>
      </div>
    </div>
  );
}
