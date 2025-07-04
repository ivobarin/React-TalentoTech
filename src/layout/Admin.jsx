import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import "./css/Admin.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AdminContext } from "../context/AdminContext";
import Form from "../components/admin/Form";

export default function Admin() {
  const { handleLogout } = useContext(AuthContext);
  const {
    productos,
    seleccionado,
    error,
    openModal,
    cargando,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleAdd,
    handleUpdate,
  } = useContext(AdminContext);

  const handleAddProduct = () => {
    handleEdit(null);
  };

  return (
    <>
      <Header />
      <div className="admin-container">
        <h1>Panel de Administración</h1>
        <p>
          Bienvenido al panel de administración. Aquí puedes gestionar
          productos, pedidos y usuarios.
        </p>
        <section className="admin-buttons">
        {console.log("cargando", cargando)}
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <button onClick={handleAddProduct}>Agregar Producto</button>
        </section>
      </div>
      <div className="admin-main">
        <h2 className="title-productos">Productos</h2>
        { cargando ? (
          <p className="loading">Cargando productos...</p>
        ) : (
          <div className="productos-grid">
            {productos.map((producto) => (
              <div className="card-container" key={producto.id}>
                <div className="imagenContainer">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="imagen"
                  />
                </div>
                <div className="info">
                  <span className="nombre">{producto.nombre}</span>
                  <span className="categoria">{producto.categoria}</span>
                  <span className="precio">
                    <strong>${producto.precio}</strong>
                  </span>
                  <div className="admin-actions">
                    <button
                      onClick={() => handleEdit(producto)}
                      className="edit-button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(producto.id)}
                      className="delete-button"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <p className="error">Ocurrió un error al cargar los datos.</p>
        )}
        {openModal && (
          <Form
            producto={seleccionado}
            isEdit={!!seleccionado.id}
            onClose={handleCloseModal}
            onSave={(producto) =>
              seleccionado.id ? handleUpdate(producto) : handleAdd(producto)
            }
          />
        )}
      </div>
      <Footer />
    </>
  );
}
