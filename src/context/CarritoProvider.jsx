import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { productsList as pruebaProductos } from "../test/products.js";
import { CarritoContext } from "./CarritoContext.jsx";

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [productos, setProductos] = useState([]);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const apiUrl = "https://682e5406746f8ca4a47ca177.mockapi.io/tienda-manch";

  async function fetchProducts() {
    try {
      const respuesta = await fetch(apiUrl);
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      setTimeout(() => {
        setProductos(data);
        setCargando(false);
        console.log("200 OK");
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductos(pruebaProductos);
      setCargando(false);
    }
  }

  useEffect(() => {
    // Cargar productos iniciales
    fetchProducts();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const AddToCart = (producto) => {
    const existingProduct = carrito.find((item) => item.id === producto.id);
    if (existingProduct) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      toast.success(`"${producto.nombre}" agregado al carrito`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        newestOnTop: false,
        draggable: true,
        progress: undefined,
        icon: <i className="fa-solid fa-cart-shopping"></i>,
        theme: "colored",
        transition: Bounce,
      });
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const removeFromCart = (producto) => {
    const existingProduct = carrito.find((item) => item.id === producto.id);
    if (existingProduct) {
      if (existingProduct.cantidad > 1) {
        setCarrito(
          carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad - 1 }
              : item
          )
        );
      } else {
        toast.error(`"${producto.nombre}" eliminado del carrito`, {
          position: "top-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          newestOnTop: false,
          draggable: true,
          progress: undefined,
          icon: <i className="fa-solid fa-cart-shopping"></i>,
          theme: "colored",
          transition: Bounce,
        });
        setCarrito(carrito.filter((item) => item.id !== producto.id));
      }
    }
  };

  const ProductosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        productos,
        setProductos,
        busqueda,
        setBusqueda,
        cargando,
        setCargando,
        AddToCart,
        isAuthenticated,
        setIsAuth,
        removeFromCart,
        ProductosFiltrados,
        isAdmin,
        setIsAdmin, 
        fetchProducts
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
