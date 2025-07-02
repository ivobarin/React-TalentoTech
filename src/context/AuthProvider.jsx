// import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "./CarritoContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export function AuthProvider({ children }) {
  const { setIsAuth, setIsAdmin } = useContext(CarritoContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    if (isAuth) {
      setIsAuth(true);
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      if (isAdmin) {
        setIsAdmin(true);
      }
    }
  }, [setIsAuth, setIsAdmin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch("data/users.json");
      // uso localStorage en lugar de fetch para obtener los usuarios para poder crearlos usando register
      const response =
        localStorage.getItem("users") ||
        (await fetch("data/users.json").then((res) => res.text()));
      console.log("Usuarios obtenidos:", response);
      const users = JSON.parse(response);
      console.log(users);

      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setIsAuth(true);
        console.log("Usuario autenticado:", foundUser);
        localStorage.setItem("isAuthenticated", "true");

        if (foundUser.role === "admin") {
          setIsAdmin(true);
          localStorage.setItem("isAdmin", "true");
          navigate("/React-TalentoTech/admin/");
        } else {
          navigate("/React-TalentoTech/cliente/");
        }
      } else {
        console.warn("Credenciales inválidas");
        setErrors({
          email: "Correo inválido",
          password: "Contraseña inválida",
        });
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setErrors({
        email: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem("isAuthenticated");
    if (localStorage.getItem("isAdmin") === "true") {
      setIsAdmin(false);
      localStorage.removeItem("isAdmin");
      swal({
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        icon: "success",
        button: "Aceptar",
      });
      navigate("/React-TalentoTech/admin/login");
      
    }
  };

  const handleRegister = async (email, password, userRole) => {
    email = email.trim();
    password = password.trim();

    if (!email || !password) {
      setErrors({
        email: "El correo electrónico es obligatorio",
        password: "La contraseña es obligatoria",
      });
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find((user) => user.email === email);
      if (existingUser) {
        setErrors({ email: "El correo electrónico ya está en uso" });
        return;
      } else {
        const newUser = {
          email,
          password,
          role: userRole, // Use the selected role
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        swal({
          title: "Registro exitoso",
          text: "Tu cuenta ha sido creada correctamente.",
          icon: "success",
          button: "Aceptar",
        });
        setIsAuth(true);
        localStorage.setItem("isAuthenticated", "true");
        setIsAuth(true);
        setErrors({});
        userRole === "admin"
          ? (localStorage.setItem("isAdmin", "true"), setIsAdmin(true))
          : setIsAdmin(false);
        userRole === "admin"
          ? navigate("/React-TalentoTech/admin/")
          : navigate("/React-TalentoTech/cliente/");
      }
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setErrors({
        email: "Algo salió mal. Por favor, inténtalo de nuevo más tarde.",
      });
      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        errors,
        setErrors,
        handleLogout,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
