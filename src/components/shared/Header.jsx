import "./shared.css";
import Carrito from "../Carrito";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/manch_logo.svg";
import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";

export default function Header() {
  const { carrito } = useContext(CarritoContext);
  const [isOpen, setIsOpen] = useState(false);

  const countProducts = () => {
    return carrito.reduce((acc, item) => acc + item.cantidad, 0);
  };

  const activeLinkStyle = () => {
    const ruta = window.location.pathname;
    const links = document.querySelectorAll(".nav-links li a");
    links.forEach((link) => {
      const linkPath = link.getAttribute("href");
      link.style.fontWeight = linkPath === ruta ? "bold" : "normal";
      link.style.color = linkPath === ruta ? "#fc9d55" : "black";
    });
  };

  const colapseMenu = () => {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("collapsed");
    const menuButton = document.querySelector(".menu-button");
    menuButton.classList.toggle("active");
  };

  useEffect(() => {
    activeLinkStyle();
  }, []);

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/React-TalentoTech" className="logo">
              <img className="logo-image" src={logo} alt="Logo" width={125} />
            </Link>
          </li>
          <div className="menu-button" onClick={colapseMenu}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="nav-links">
            <li>
              <Link to="/React-TalentoTech">Inicio</Link>
            </li>
            <li>
              <Link to="/React-TalentoTech/about">Acerca</Link>
            </li>
            <li>
              <Link to="/React-TalentoTech/shop">Tienda</Link>
            </li>
          </div>
          <div className="icon-container">
            <li>
              <Link to="/React-TalentoTech/admin" className="profile-link">
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
            <li>
              <div className="cart-icon">
                <div className="product-count">
                  {countProducts() >= 0 && (
                    <span className="count">{countProducts()}</span>
                  )}
                </div>
                <button className="cart-button" onClick={() => setIsOpen(true)}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <Carrito isOpen={isOpen} setIsOpen={setIsOpen} />
              </div>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
