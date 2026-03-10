import "./Modal.css";

function Modal({ open, title, children, onClose }) {
  if (!open) {
    return null;
  }

  return (
    <div className="app-modal-backdrop" role="dialog" aria-modal="true">
      <div className="app-modal">
        <div className="app-modal-header">
          <h3>{title}</h3>
          <button type="button" className="app-modal-close" onClick={onClose}>
            x
          </button>
        </div>
        <div className="app-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
