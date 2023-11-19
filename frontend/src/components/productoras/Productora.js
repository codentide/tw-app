import React, { useEffect, useState } from "react";
import ModuleCard from "../gui/ModuleCard";
import Spinner from "../gui/Spinner";
import ModalBtn from "../gui/ModalButton";
import Modal from "../gui/Modal";
import {
  createProductora,
  deleteProductora,
  getProductoras,
} from "../../services/ProductoraService";

export default function Productora() {
  const [productoras, setProductoras] = useState([]);
  const [loader, setLoader] = useState(false);
  const [productora, setProductora] = useState({
    nombre: "",
    descripcion: "",
    slogan: "",
  });

  useEffect(() => {
    listProductoras();
  }, []);

  const listProductoras = async () => {
    setLoader(true);
    try {
      const { data } = await getProductoras();
      setProductoras(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Función para crear un nuevo género
  const createProductoras = async () => {
    setLoader(true);
    try {
      await createProductora(productora);
      listProductoras();
      cleanForm();
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Función para eliminar un género
  const deleteProductoras = async (e) => {
    setLoader(true);
    console.log(e.target.getAttribute("data-module-id"));
    try {
      const { data } = await deleteProductora(
        e.target.getAttribute("data-module-id")
      );
      setLoader(false);
      listProductoras(data);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    console.log(e.target);
    setProductora({
      ...productora,
      [e.target.name]: e.target.value,
    });
  };

  // Función para limpiar el formulario
  const cleanForm = () => {
    setProductora({
      nombre: "",
      descripcion: "",
      slogan: "",
    });
  };

  // Renderizado del componente
  return (
    <section className="sectionContainer">
      {loader && <Spinner />}
      <div>
        <ModuleCard module={productoras} deleteModule={deleteProductoras} />
        <Modal
          title="Crear Productora"
          modalId="createProductoraModal"
          module={productora}
          change={handleChange}
          clean={cleanForm}
          slogan={true}
          save={createProductoras}
        />
      </div>
      <ModalBtn modalId="createProductoraModal" content="Nueva Productora" />
    </section>
  );
}
