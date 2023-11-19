import React from "react";

export default function Modal({
  modalId,
  title,
  module,
  change,
  save,
  clean,
  update,
  isUpdate,
  slogan,
}) {
  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    change(e);
  };

  // Función para guardar el género
  const modalSaveModule = (e) => {
    e.preventDefault();
    save();
  };
  const modalUpdateModule = (e) => {
    e.preventDefault();
    update();
  };

  // Función para limpiar el formulario
  const modalCleanForm = () => {
    clean();
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={modalCleanForm}
            ></button>
          </div>
          <form onSubmit={isUpdate ? modalUpdateModule : modalSaveModule}>
            <div className="modal-body">
              <div className="mb-1">
                <label htmlFor="nombre" className="col-form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  onChange={handleChange}
                  value={module.nombre}
                  name="nombre"
                ></input>
              </div>
              <div className="mb-1">
                <label htmlFor="descripcion" className="col-form-label">
                  Descripción
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="descripcion"
                  onChange={handleChange}
                  value={module.descripcion}
                  name="descripcion"
                ></textarea>
              </div>
              {slogan ? (
                <div className="mb-3">
                  <label htmlFor="slogan" className="col-form-label">
                    Slogan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="slogan"
                    onChange={handleChange}
                    value={module.slogan}
                    name="slogan"
                  ></input>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={modalCleanForm}
              >
                Cerrar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={module.nombre.length === 0}
              >
                {isUpdate ? "Actualizar" : "Crear"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
