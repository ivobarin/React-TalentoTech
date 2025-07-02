import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./css/Cliente.css";

export default function Cliente() {
  const { handleLogout } = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className="cliente-container">
        <div className="cliente-header">
          <h1>Bienvenido al Cliente</h1>
        </div>
        <p>
          Esta es la sección del cliente donde puedes ver tus pedidos y
          gestionar tu cuenta.
        </p>
        <div className="cliente-actions">
          <button onClick={handleLogout}>salir</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
