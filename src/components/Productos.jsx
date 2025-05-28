// ProductoItem.jsx
import React from "react";
import "./css/Productos.css";

function ProductoItem({ product, setCarrito, setIsOpen }) {
  // Función para agregar el producto al carrito
  const agregarAlCarrito = () => {
    // Aseguramos un ID único para cada producto en el carrito
    const productoEnCarrito = {...product, id: product.id + Date.now()}; 
    setCarrito((prevCarrito) => [...prevCarrito, productoEnCarrito]);
    setIsOpen(true); // Abrimos el carrito al agregar un producto
  };

  return (
    <section className="card">
      <div className="imagenContainer">
        <img src={product.imagen} alt={product.nombre} className="imagen" />
        <button onClick={agregarAlCarrito} className="add-button">
          <i className="fa-solid fa-cart-shopping"></i>
        </button>
      </div>
      <span className="nombre">{product.nombre}</span>
      <span className="categoria">{product.categoria}</span>
      <span className="stock">stock: {product.stock}</span>
      <span className="precio">
        <strong>${product.precio}</strong>
      </span>
    </section>
  );
}

function Productos({ products, setCarrito, setIsOpen }) {
  if (!Array.isArray(products)) {
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
        {products.map((product) => (
          <ProductoItem
            key={product.id}
            product={product}
            setCarrito={setCarrito}
            setIsOpen={setIsOpen}
          />
        ))}
      </section>
    </>
  );
}

export default Productos;
