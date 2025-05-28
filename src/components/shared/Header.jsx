import "./shared.css";
import Carrito from "../Carrito";
import {Link} from "react-router-dom";
export default function Header({ carrito, setCarrito, isOpen, setIsOpen }) {
  return (
    <header className="header">
      <nav className="nav">
        <ul>
          <li>
            <Link to="/" className="logo">
              <img src="public/manch_logo.svg" alt="Logo" width={130} />
            </Link>
          </li>
          <div className="nav-links">
            <li>
              <Link to="/">Inicio</Link>
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
              <Carrito carrito={carrito} setCarrito={setCarrito} isOpen={isOpen} setIsOpen={setIsOpen} />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
