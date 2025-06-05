import { useState, useEffect } from "react";
import "./css/Carrito.css";

function Carrito({ carrito, setCarrito, isOpen, setIsOpen }) {
  const [total, setTotal] = useState(0);

  // Calcular el total del carrito cada vez que agreguemos o eliminemos un producto
  useEffect(() => {
    const nuevoTotal = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    setTotal(nuevoTotal);
  }, [carrito]);

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const eliminarProducto = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== id));
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
          <p className="empty-cart">No hay productos en el carrito</p>
        ) : (
          <div className="cart-items">
            <ul>
              {carrito.map((producto, index) => (
                <li key={producto.id + index} className="cart-item">
                  {producto.nombre} - ${producto.precio}
                  <button className="remove-item" onClick={() => eliminarProducto(producto.id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
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
