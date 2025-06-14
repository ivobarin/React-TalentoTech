import Header from "./shared/Header";
import Footer from "./shared/Footer";
import Estrellas from "./Estrellas";
import "./css/ProductoDetalle.css";
import { Link, useParams } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const ProductoDetalle = ({
  products,
  carrito,
  setCarrito,
  isOpen,
  setIsOpen,
}) => {
  const { id } = useParams();
  const producto = products.find((prod) => prod.id === parseInt(id));

  if (!producto) {
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
      <Header
        carrito={carrito}
        setCarrito={setCarrito}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="producto-detalle">
        <div className="producto-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        <h2>{producto.nombre}</h2>
        <Estrellas />
        <p className="producto-descripcion-texto">{producto.descripcion}</p>
        <div className="boton-container">
          <button
            className="agregar-carrito"
            onClick={() => {
              const productoEnCarrito = {
                ...producto,
                id: producto.id,
              };
              setCarrito((prevCarrito) => {
                const productoExistente = prevCarrito.find(
                  (item) => item.id === productoEnCarrito.id
                );
                if (productoExistente) {
                  return prevCarrito.map((item) =>
                    item.id === productoEnCarrito.id
                      ? { ...item, cantidad: item.cantidad + 1 }
                      : item
                  );
                } else {
                  const productoEnCarrito = {
                    ...producto,
                    cantidad: 1,
                    id: producto.id,
                  };
                  return [...prevCarrito, productoEnCarrito];
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
        </div>
        <div className="producto-descripcion">
          <span className="descripcion-categoria">
            <strong>Categoría:</strong> {producto.categoria}
          </span>
          <span className="descripcion-precio">
            <strong>Precio:</strong> ${producto.precio}
          </span>
        </div>
        <Link to="/React-TalentoTech/shop" className="link">
          Volver a Productos
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ProductoDetalle;
