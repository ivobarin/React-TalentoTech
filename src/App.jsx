import React from "react";
import "./App.css";
import Home from "./layout/Home";
import NotFound from "./components/NotFound";
import About from "./layout/About";
import Shop from "./layout/Shop";
import Login from "./layout/Login";
import ProductoDetalle from "./components/ProductoDetalle";
import RutaProtegida from "./components/RutaProtegida";
import RutaAdmin from "./components/RutaAdmin";
import Cliente from "./layout/Cliente";
import Admin from "./layout/Admin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/React-TalentoTech/" element={<Home />} />
        <Route path="/React-TalentoTech/about" element={<About />} />
        <Route path="/React-TalentoTech/shop" element={<Shop />} />
        <Route
          path="/React-TalentoTech/productos/:id"
          element={<ProductoDetalle />}
        />
        <Route path="/React-TalentoTech/login" element={<Login />} />
        <Route
          path="/React-TalentoTech/admin"
          element={
            <RutaProtegida>
              <RutaAdmin>
                <Admin />
              </RutaAdmin>
            </RutaProtegida>
          }
        />
        <Route
          path="/React-TalentoTech/cliente"
          element={
            <RutaProtegida>
              <Cliente />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
