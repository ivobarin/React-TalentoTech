import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import "./css/About.css";
export default function About({carrito, setCarrito, isOpen, setIsOpen}) {
  return (
    <>
      <Header carrito={carrito} setCarrito={setCarrito} isOpen={isOpen} setIsOpen={setIsOpen} />
      <main>
        <h1>Acerca de Nosotros</h1>
        <h2>¡Bienvenido a tienda Manch!</h2>
        <p>
          Somos una cafetería y tienda de bebidas dedicada a ofrecerte los mejores productos para disfrutar en cualquier momento del día. Desde cafés recién preparados hasta refrescantes bebidas frías, tenemos algo para todos los gustos.
        </p>
      </main>
      <Footer />
    </>
  );
}
