import React from "react";
import "../styles/ConfirmationModal.css";

const ConfirmationModal = ({ showModal, onClose, onConfirm, movieTitle }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="conf-title">Confirm Purchase</h2>
        <p className="conf-text">Are you sure you want to buy "{movieTitle}"?</p>
        <div className="conf-modal-button">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
