// ProductoItem.jsx
import React from "react";
import "./css/Productos.css";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

function ProductoItem({ product }) {
  const { setCarrito } = useContext(CarritoContext);

  const agregarAlCarrito = () => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === product.id
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        const productoEnCarrito = { ...product, cantidad: 1, id: product.id };
        return [...prevCarrito, productoEnCarrito];
      }
    });
    toast.success(`"${product.nombre}" agregado al carrito`, {
      position: "top-left",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: <i className="fa-solid fa-cart-shopping"></i>,
      theme: "colored",
      transition: Bounce,
    });
  };

  return (
    <section className="card">
      <div className="imagenContainer">
        <img src={product.imagen} alt={product.nombre} className="imagen" />
        <button onClick={agregarAlCarrito} className="add-button">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
      <div className="info"></div>
        <span className="nombre">{product.nombre}</span>
        <span className="categoria">{product.categoria}</span>
        <span className="precio">
          <strong>${product.precio}</strong>
        </span>
        <Link
          to={`/React-TalentoTech/productos/${product.id}`}
          className="detalle-button"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        <span>Ver Más</span>
      </Link>
    </section>
  );
}

function Productos() {
  const { productos } = useContext(CarritoContext);
  if (!Array.isArray(productos)) {
    return (
      <p style={{ color: "red", fontFamily: "Lexend Exa" }}>
        No hay productos disponibles
      </p>
    );
  }

  return (
    <>
      <h1>Nuestros Productos</h1>
      <section className="productos-container">
        {productos.map((product) => (
          <ProductoItem key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}

export default Productos;
