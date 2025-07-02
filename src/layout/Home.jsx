import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Productos from "../components/Productos";
import "./css/Home.css";
import { CarritoContext } from "../context/CarritoContext";
import { useContext } from "react";
import loading from "../images/loading.gif"; // Assuming you have a loading gif in this path

export default function Home() {
  const { cargando } = useContext(CarritoContext);
  return (
    <>
      <Header />
      <div className="shop-container">
        {cargando ? (
          <div className="loading">
            <h1>Cargando productos...</h1>
            <div className="loading-image">
              <img src={loading} alt="Cargando..." />
            </div>
          </div>
        ) : (
          <>
            <div className="hero-container">
              <div className="hero-text">
                <h1>Bienvenido a tienda manch</h1>
                <p>Descubre los mejores cafés y bebidas frías</p>
              </div>
            </div>
            <Productos />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
