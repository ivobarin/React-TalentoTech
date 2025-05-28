import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import { productsList } from "./test/data";
import Home from "./layout/Home";
import NotFound from "./components/NotFound";
import About from "./layout/About";
import Shop from "./layout/Shop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  // Estado para almacenar los productos iniciales, el carrito y su estado de apertura
  const [products, setProducts] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function fetchProducts() {
    try {
      // API creada con https://designer.mocky.io/ para simular la obtención de productos
      // el endpoint devuelve un JSON con una lista de productos, salta como peligroso en los navegadores porque es un endpoint externo
      const response = await fetch(
        "https://run.mocky.io/v3/bc51a190-8902-4ca0-990e-f4e262335bf7"
      );
      if (!response.ok) {
        throw new Error("Error al cargar los productos");
      }
      const data = await response.json();
      setProducts(data);
      console.log("200 OK");
    } catch (error) {
      console.error("Error fetching products:", error);
      // Si hay un error, usar productos de prueba estáticos
      setProducts(productsList);
    }
  }

  useEffect(() => {
    // Cargar productos iniciales
    fetchProducts();
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                carrito={carrito}
                setCarrito={setCarrito}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                products={products}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                carrito={carrito}
                setCarrito={setCarrito}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                carrito={carrito}
                setCarrito={setCarrito}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                products={products}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
