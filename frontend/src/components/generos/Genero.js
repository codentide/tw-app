import React, { useEffect, useState } from "react";
import {
  createGenero,
  getGeneros,
  deleteGenero,
} from "../../services/GeneroService";
import ModuleCard from "../gui/ModuleCard";
import Modal from "../gui/Modal";
import Spinner from "../gui/Spinner";
import ModalBtn from "../gui/ModalButton";

export default function Genero() {
  // Estado para almacenar la lista de géneros
  const [generos, setGeneros] = useState([]);
  // Estado para manejar el estado del cargador
  const [loader, setLoader] = useState(false);
  // Estado para los datos del género que se va a crear
  const [genero, setGenero] = useState({
    nombre: "",
    descripcion: "",
  });

  // Efecto que se ejecuta al cargar el componente para obtener la lista de géneros
  useEffect(() => {
    listGeneros();
  }, []);

  // Función para obtener la lista de géneros
  const listGeneros = async () => {
    setLoader(true);
    try {
      const { data } = await getGeneros();
      setGeneros(data);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Función para crear un nuevo género
  const saveGenero = async () => {
    setLoader(true);
    try {
      await createGenero(genero);
      listGeneros();
      cleanForm();
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // Función para eliminar un género
  const deleteGeneros = async (e) => {
    setLoader(true);
    console.log(e.target.getAttribute("data-module-id"));
    try {
      const { data } = await deleteGenero(
        e.target.getAttribute("data-module-id")
      );
      setLoader(false);
      listGeneros(data);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };

  // // Función para editar un género
  // const updateGeneros = async (e) => {
  //   setLoader(true);
  //   console.log(e.target.getAttribute("data-module-id"));
  //   try {
  //     const { data } = await updateGenero(
  //       e.target.getAttribute("data-module-id"),
  //       genero
  //     );
  //     listGeneros(data);
  //     setLoader(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoader(false);
  //   }
  // };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    console.log(e.target);
    setGenero({
      ...genero,
      [e.target.name]: e.target.value,
    });
  };

  // Función para limpiar el formulario
  const cleanForm = () => {
    setGenero({
      nombre: "",
      descripcion: "",
    });
  };

  // Renderizado del componente
  return (
    <section className="sectionContainer">
      {loader && <Spinner />}
      <div>
        <ModuleCard module={generos} deleteModule={deleteGeneros} />
        <Modal
          title="Crear Género"
          modalId="createGeneroModal"
          module={genero}
          change={handleChange}
          save={saveGenero}
          clean={cleanForm}
        />
        <Modal
          title="Actualizar Género"
          modalId="updateGeneroModal"
          module={genero}
          change={handleChange}
          clean={cleanForm}
          isUpdate={true}
        />
      </div>
      <ModalBtn modalId="createGeneroModal" content="Nuevo Género" />
    </section>
  );
}
