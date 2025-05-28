import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Productos from "../components/Productos";
import "./css/Home.css"; 

export default function Home({ carrito, setCarrito, isOpen, setIsOpen, products }) {
  return (
    <>
      <Header
        carrito={carrito}
        setCarrito={setCarrito}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="hero-container">
        <div className="hero-text">
          <h1>Bienvenido a tienda manch</h1>
          <p>Descubre los mejores cafés y bebidas frías</p>
        </div>
      </div>
      <div className="shop-container">
        <Productos
          products={products}
          setCarrito={setCarrito}
          setIsOpen={setIsOpen}
        />
      </div>
      <Footer />
    </>
  );
}
