import { useEffect, useState } from "react";
import swal from "sweetalert";
import { AdminContext } from "./AdminContext";

export const AdminProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const apiUrl = "https://682e5406746f8ca4a47ca177.mockapi.io/tienda-manch";

  async function fetchProducts() {
    try {
      const respuesta = await fetch(apiUrl);
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      setTimeout(() => {
        setProductos(data);
        setLoading(false);
        console.log("200 OK");
      }, 2000);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Cargar productos iniciales
    fetchProducts();
  }, []);

  const handleEdit = (producto) => {
    if (producto) {
      setSeleccionado(producto);
    } else {
      setSeleccionado({
        nombre: "",
        precio: 0,
        stock: 0,
        imagen: "",
        categoria: "",
      });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSeleccionado(false);
  };

  const handleDelete = async (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Lógica para eliminar el producto
        fetch(`${apiUrl}/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            setProductos(productos.filter((producto) => producto.id !== id));
            swal("Eliminado!", "El producto ha sido eliminado.", "success");
          })
          .catch((error) => console.error(error));
      }
    });
  };

  const handleAdd = async (nuevoProducto) => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      setProductos([...productos, data]);
      setOpenModal(false);
      swal(
        "¡Producto agregado!",
        "El producto ha sido agregado exitosamente.",
        "success"
      );
    } catch (error) {
      console.error("Error adding product:", error);
      setError(true);
    }
  };

  const handleUpdate = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${apiUrl}/${productoActualizado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      });
      console.log(
        `Respuesta del servidor: ${respuesta.status} ${respuesta.statusText}`
      );
      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        console.error("Error updating product:", errorData);
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      setProductos(
        productos.map((producto) => (producto.id === data.id ? data : producto))
      );
      setOpenModal(false);
      swal(
        "¡Producto actualizado!",
        "El producto ha sido actualizado exitosamente.",
        "success"
      );
      setSeleccionado(false);
    } catch (error) {
      console.error("Error updating product:", error);
      setError(true);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        productos,
        loading,
        seleccionado,
        error,
        openModal,
        handleEdit,
        handleCloseModal,
        handleDelete,
        handleAdd,
        handleUpdate,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
