import { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import { AdminContext } from "./AdminContext";
import { CarritoContext } from "./CarritoContext";

export const AdminProvider = ({ children }) => {
  const { fetchProducts, productos, setProductos } = useContext(CarritoContext);
  const [seleccionado, setSeleccionado] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const apiUrl = "https://682e5406746f8ca4a47ca177.mockapi.io/tienda-manch";

  const loadAdminProducts = async () => {
    try {
      const respuesta = await fetch(apiUrl);
      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
      }
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Cargar productos iniciales
    loadAdminProducts().finally(() => {
      setCargando(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (producto) => {
    if (producto) {
      setSeleccionado(producto);
    } else {
      setSeleccionado({
        nombre: "",
        precio: 0,
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
      title: `¿Eliminar este producto?`,
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
            fetchProducts(); // Refrescar la lista de productos
            setOpenModal(false);
            setSeleccionado(false);
            swal("Eliminado!", "El producto ha sido eliminado.", "success");
          })
          .catch((error) => console.error("Error:", error));
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
      setSeleccionado(false);
      fetchProducts(); // Refrescar la lista de productos
      swal(
        "¡Producto agregado!",
        `${data.nombre} ha sido agregado exitosamente.`,
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
      fetchProducts(); // Refrescar la lista de productos
      setSeleccionado(false);
      swal(
        "¡Producto actualizado!",
        `${data.nombre} ha sido actualizado exitosamente.`,
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
        seleccionado,
        error,
        openModal,
        cargando,
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
