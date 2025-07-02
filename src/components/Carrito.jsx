import { useState, useEffect, useContext } from "react";
import "./css/Carrito.css";

import { CarritoContext } from "../context/CarritoContext";

function Carrito({ isOpen, setIsOpen }) {
  // para manejar el total del carrito
  const { carrito, setCarrito, removeFromCart } = useContext(CarritoContext);
  const [total, setTotal] = useState(0);
  // controla la alerta de producto eliminado usando un toast

  useEffect(() => {
    const nuevoTotal = carrito.reduce(
      (acc, producto) => acc + producto.precio * producto.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [carrito]);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  return (
    <div className={`cart-container ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Carrito de Compras</h2>
        <button className="close-cart" onClick={() => setIsOpen(false)}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="cart-content">
        {carrito.length === 0 ? (
          <div className="empty-cart-container">
            <p className="empty-cart">No hay productos en el carrito</p>
          </div>
        ) : (
          <div className="cart-items">
            <ul>
              {carrito.map((producto) => (
                <li key={producto.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">
                      {producto.nombre.split(" ")[0]}
                    </span>
                    <span className="item-price">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </span>
                  </div>
                  <div className="item-controls">
                    <button
                      className="remove-item"
                      onClick={() => removeFromCart(producto)}
                    >
                      <i className="fa-solid fa-minus"></i>
                    </button>
                    <span className="quantity">{producto.cantidad}</span>
                    <button
                      className="increment-item"
                      onClick={() => incrementarCantidad(producto.id)}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`cart-buttons ${carrito.length === 0 ? "" : "open"}`}>
          <button onClick={vaciarCarrito}>Vaciar Carrito</button>
        </div>
        {total > 0 && (
          <span className="total">
            Total: <strong>${total}</strong>
          </span>
        )}
      </div>
    </div>
  );
}

export default Carrito;
