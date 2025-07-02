import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import Register from "../components/Register";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./css/Login.css";

export default function Login() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { email, setEmail, password, setPassword, handleLogin, errors } =
    useContext(AuthContext);

  const [showUsers, setShowUsers] = useState(false);

  return (
    <>
      <div className="login-container">
        <Header />
        <Register setDialogOpen={setDialogOpen} dialogOpen={dialogOpen} />
        {!dialogOpen && (
          <>
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico:</label>
                <input
                  type="email"
                  value={email}
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="button-group">
                <label>
                  <input type="checkbox" name="remember" />
                  Recordar sesión
                </label>
                <button type="submit">Iniciar Sesión</button>
              </div>
            </form>
          </>
        )}
        <div className="show-users">
          <button
            onClick={() => {
              setShowUsers(!showUsers);
            }}
          >
            Mostrar Usuarios
          </button>
          {showUsers && (
            <div className="users-list">
              <h2>Usuarios Registrados</h2>
              {localStorage.getItem("users") ? (
                <ul>
                  {JSON.parse(localStorage.getItem("users")).map(
                    (user, index) => (
                      <li key={index}>{user.email} - {user.password} - {user.role}</li>
                    )
                  )}
                </ul>
              ) : (
                <p>No hay usuarios registrados</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
