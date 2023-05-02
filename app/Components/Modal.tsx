interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

function Modal({ modalOpen, setModalOpen, children }: ModalProps) {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label onClick={() => setModalOpen(false)} className="btn btn-sm btn-circle absolute right-2 top-2">
          ✕
        </label>
        {children}
      </div>
    </div>
  );
}

export default Modal;
