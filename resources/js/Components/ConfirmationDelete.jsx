import React from "react";
import { Modal, Button } from "some-ui-library";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, processing }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} className="modal">
            <div className="modal-content">
                <h3 className="text-lg font-bold">Confirmation de suppression</h3>
                <p className="my-4">{message}</p>
                <div className="flex justify-end space-x-4 modal-footer">
                    <Button onClick={onClose} className="btn-secondary">
                        Annuler
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="btn-error"
                        disabled={processing}
                    >
                        {processing ? "Suppression..." : "Supprimer"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;
