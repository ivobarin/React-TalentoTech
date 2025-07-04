import { useState } from "react";
import "./Form.css";

function Form({ producto, isEdit, onClose, onSave }) {
  const [nuevoProducto, setNuevoProducto] = useState(
    producto || {
      nombre: "",
      precio: 0,
      stock: 0,
      imagen: "",
      categoria: "",
    }
  );
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nuevoProducto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }
    if (
      !nuevoProducto.precio ||
      nuevoProducto.precio <= 0 ||
      (String(nuevoProducto.precio).startsWith("0") &&
        String(nuevoProducto.precio).length > 1)
    ) {
      nuevosErrores.precio = "El precio debe ser un número válido mayor a 0.";
    }
    if (!nuevoProducto.categoria.trim() || nuevoProducto.categoria.length < 5) {
      nuevosErrores.categoria =
        "La categoria debe tener al menos 5 caracteres.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      return;
    }
    onSave(nuevoProducto);
  };

  return (
    <dialog open={true} className="form-dialog">
      <form onSubmit={handleSubmit}>
        <div className="close-button">
          <button type="button" onClick={onClose}>
            &times;
          </button>
        </div>
        <h2>{isEdit ? "Editar Producto" : "Agregar Producto"}</h2>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
            required
          />
          {errores.nombre && <p className="error-message">{errores.nombre}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            value={nuevoProducto.precio}
            onChange={handleChange}
            required
            min="0"
          />
          {errores.precio && <p className="error-message">{errores.precio}</p>}
        </div>
        <div>
          <label>Imagen URL:</label>
          <input
            type="text"
            name="imagen"
            value={nuevoProducto.imagen || ""}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />
          {errores.imagen && <p className="error-message">{errores.imagen}</p>}
        </div>
        <div>
          <label>Categoría:</label>
          <input
            type="text"
            name="categoria"
            value={nuevoProducto.categoria || ""}
            onChange={handleChange}
            required
          />
          {errores.categoria && (
            <p className="error-message">{errores.categoria}</p>
          )}
        </div>
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            name="descripcion"
            value={nuevoProducto.descripcion || ""}
            onChange={handleChange}
            required
          />
          {errores.descripcion && <p className="error-message">{errores.descripcion}</p>}
        </div>
        <button type="submit">Guardar</button>
      </form>
    </dialog>
  );
}

export default Form;
