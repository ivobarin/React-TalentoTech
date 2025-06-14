import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const savedCart = localStorage.getItem("carrito");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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

  const removeFromCart = (id) => {
    const producto = carrito.find((item) => item.id === id);
    const updatedCart = carrito.filter((item) => item.id !== id);
    setCarrito(updatedCart);
    toast.error(`"${producto.nombre}" eliminado del carrito`, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      newestOnTop: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      icon: <i className="fa-solid fa-trash"></i>,
      theme: "colored",
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        setCarrito,
        isOpen,
        setIsOpen,
        AddToCart,
        removeFromCart,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
