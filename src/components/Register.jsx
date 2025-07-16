import "./css/Register.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register({ setDialogOpen, dialogOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [userRole, setUserRole] = useState("user"); // Default role is 'user'
  const { handleRegister, errors, setErrors } = useContext(AuthContext);

  useEffect(() => {
    const alertElement = document.querySelector(".register-alert");
    alertElement.classList.add("animate-slide-left");
  }, []);

  const handleOpenDialog = () => {
    setDialogOpen(true);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="register-alert">
          <button
            className="close-btn"
            onClick={() => {
              setIsVisible(false);
            }}
          >
            &times;
          </button>
          <p>
            Crear usuario en local storage
            <br />
            <br />
            REGISTRATE{" "}
            <button className="show-register-btn" onClick={handleOpenDialog}>
              aquí
            </button>
          </p>
        </div>
      )}
      <div className={`register-container ${dialogOpen ? "open" : ""}`}>
        <dialog className="modal" open={dialogOpen}>
          <button
            className="close-modal"
            onClick={() => {
              setDialogOpen(false);
              setErrors({});
              setIsVisible(true); 

            }}
          >
            &times;
          </button>
          <div className="modal-content">
            <h2>Registrate</h2>
            <form>
              <div className="form-group">
                <label htmlFor="reg-email">Correo Electrónico:</label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  required
                  placeholder="(no es necesario que sea real)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="reg-password">Contraseña:</label>
                <input
                  type="password"
                  id="reg-password"
                  value={password}
                  name="password"
                  placeholder="se puede ver en mostrar usuarios"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="user-role">Rol de Usuario:</label>
                <select
                  id="user-role"
                  name="user-role"
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="button-group">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegister(email, password, userRole);
                  }}
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}
