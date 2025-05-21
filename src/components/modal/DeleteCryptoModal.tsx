import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import { RemoveCrypto } from 'api_actions/cryptoService';

type DeleteModalProps = {
    label?: string
    amount?: number
    cancel?: Function
    id: string
    open: Boolean
}

function DeleteCryptoModal({amount, label, cancel, id, open = false}: DeleteModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
        if(open) {
            handleOpen()
        }
    },[open])

    const callDeleteRoute = () => {
        RemoveCrypto(id);
    }

    const handleCancel = () => {
        if(cancel){
            cancel()
        }
        handleClose()
    };

    const handleConfirm = () => {
        callDeleteRoute()
        handleClose()
    };

    return (
        <div>
            {isModalOpen && (
                <Modal
                    title="Delete Item"
                    confirmLabel="Yes, Delete"
                    cancelLabel="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                >
                    <h2>{label}</h2>
                    <h3>{amount}</h3>
                    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                </Modal>
            )}
        </div>
    );
}

export default DeleteCryptoModal