import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Productos from "../components/Productos";
import "./css/Shop.css"; 

export default function Shop({ carrito, setCarrito, isOpen, setIsOpen, products }) {
  return (
    <>
      <Header
        carrito={carrito}
        setCarrito={setCarrito}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
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
