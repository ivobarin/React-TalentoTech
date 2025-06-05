import "./shared.css";
import Carrito from "../Carrito";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/manch_logo.svg";
export default function Header({ carrito, setCarrito, isOpen, setIsOpen }) {
  
  // agregar estilo a la ruta activa
  const activeLinkStyle = () => {
    const ruta = window.location.pathname;
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach(link => {
      const linkPath = link.getAttribute("href");
      link.style.fontWeight = linkPath === ruta ? "bold" : "normal";
      link.style.color = linkPath === ruta ? "#fc9d55" : "black";
    });
  };

  useEffect(() => {
    activeLinkStyle();
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/React-TalentoTech" className="logo">
              <img src={logo} alt="Logo" width={125} />
            </Link> 
          </li>
          <div className="nav-links">
            <li>
              <Link to="/React-TalentoTech">Inicio</Link>
            </li>
            <li>
              <Link to="/about">Acerca</Link>
            </li>
            <li>
              <Link to="/shop">Tienda</Link>
            </li>
          </div>
          <div className="icon-container">
            <li>
              <Link to="/profile" className="profile-link">
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
            <li>
              <button className="cart-button" onClick={() => setIsOpen(true)}>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
