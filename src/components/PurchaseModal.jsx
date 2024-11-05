import React from 'react';
import '../styles/PurchaseModal.css';

const PurchaseModal = ({ showModal, onClose, movieTitle, newBalance }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className='purc-title'>Purchase Successful!</h2>
                <p className='purc-text'>You have successfully purchased "{movieTitle}".</p>
                <p className='purc-text'>Your new balance is: <strong>Rp. {newBalance}</strong></p>
                <button className="modal-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PurchaseModal;