export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">Inicio</a>
          <a href="#">Acerca</a>
          <a href="#">Tienda</a>
        </div>
        <div className="social-icons">
          <a href="#">
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </div>
      </div>
      <p className="footer-text">
        Sin fines comerciales, pagina creada para Talento Tech
      </p>
      <p style={{ padding: "16px" }}>
        Creada con <i className="fa-solid fa-heart"></i> por {" "}
        <a className="personal-link" href="https://github.com/ivobarin" target="_blank">
          Ivo Barin
        </a>
      </p>
    </footer>
  );
}
