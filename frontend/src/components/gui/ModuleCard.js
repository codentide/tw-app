import React from "react";

export default function ModuleCard({ module = [], deleteModule }) {
  const deleteModuleItem = (e) => {
    e.preventDefault();
    deleteModule(e);
  };

  return (
    <div className="moduleContainer">
      {" "}
      {module.map((m, index) => {
        return (
          <div class="card">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title mb-0">{`${index + 1}. ${m.nombre}`}</h5>
              <p class="card-text mb-2">
                <small class="text-body-secondary">
                  {m.estado ? "Activo" : "Inactivo"}
                </small>
              </p>
              <p className="card-text mb-2">{m.descripcion}</p>

              {m.slogan ? (
                <p class="blockquote-footer mt-2 mb-3">"{m.slogan}"</p>
              ) : (
                <></>
              )}

              <div className="card-buttonBox">
                {/* <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#updateGeneroModal"
                  data-bs-whatever="@mdo"
                  data-module-id={m._id}
                >
                  Actualizar
                </button> */}
                <button
                  type="button"
                  className="btn btn-danger"
                  data-module-id={m._id}
                  onClick={deleteModuleItem}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
