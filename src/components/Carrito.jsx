import { useState } from "react";
import "./css/Carrito.css";

function Carrito({ carrito, setCarrito, isOpen, setIsOpen }) {
  const [total, setTotal] = useState(0);

  const calcularTotal = () => {
    const total = carrito.reduce((acc, item) => acc + item.precio, 0);
    setTotal(total);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setTotal(0);
  };

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button className="close-cart" onClick={() => setIsOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      {carrito.length === 0 ? (
        <p className="empty-cart">No hay productos en el carrito</p>
      ) : (
        <div className="cart-items">
          <ul>
            {carrito.map((producto, index) => (
              <li key={producto.id + index} className="cart-item">
                {producto.nombre} - ${producto.precio}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={`cart-buttons ${carrito.length === 0 ? "" : "open"}`}>
        <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        <button onClick={calcularTotal}>Calcular Total</button>
      </div>
      {total > 0 && (
        <span className="total">
          Total: <strong>${total}</strong>
        </span>
      )}
    </div>
  );
}

export default Carrito;
