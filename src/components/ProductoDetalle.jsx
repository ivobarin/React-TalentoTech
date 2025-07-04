import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Estrellas from "./Estrellas";
import "./css/ProductoDetalle.css";
import { Link, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const { productos, setCarrito } = useContext(CarritoContext);
  console.log(productos, id);
  const producto = productos.find((prod) => prod.id === id);
  console.log(producto);

  if (producto === undefined) {
    return (
      <div className="not-found-container">
        <div className="not-found-content">
          <h2>Producto no encontrado</h2>
          <p>Lo sentimos, el producto que buscas no existe.</p>
          <Link className="link" to="/React-TalentoTech/shop">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="producto-detalle-container">
        <div className="producto-detalle-grid">
          <div className="producto-imagen">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="producto-info">
            <h2>{producto.nombre}</h2>
            <Estrellas/>
            <p className="producto-descripcion-texto">{producto.descripcion}</p>
            <div className="producto-descripcion">
              <span className="descripcion-categoria">
                <strong>Categoría:</strong> {producto.categoria}
              </span>
              <span className="descripcion-precio">
                <strong>Precio:</strong> ${producto.precio}
              </span>
            </div>
            <div className="boton-container">
              <button
                className="agregar-carrito"
                onClick={() => {
                  setCarrito((prevCarrito) => {
                    const productoExistente = prevCarrito.find(
                      (item) => item.id === producto.id
                    );
                    if (productoExistente) {
                      return prevCarrito.map((item) =>
                        item.id === producto.id
                          ? { ...item, cantidad: item.cantidad + 1 }
                          : item
                      );
                    } else {
                      return [...prevCarrito, { ...producto, cantidad: 1 }];
                    }
                  });
                  toast.success(`"${producto.nombre}" agregado al carrito`, {
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
                }}
              >
                Agregar al Carrito
              </button>
              <Link to="/React-TalentoTech/shop" className="link">
                Volver a Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductoDetalle;
