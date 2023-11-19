import React from "react";

export default function ModalBtn({ modalId, content }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target={"#" + modalId}
      data-bs-whatever="@mdo"
    >
      {content}
    </button>
  );
}
