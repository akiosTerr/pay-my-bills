import React, { useEffect, useState } from 'react'
import Modal from './Modal';
import { CryptoStructure, EditCrypto, NewCryptoInput } from 'api_actions/cryptoService';
import NumberInput from 'components/atoms/NumberInput';

type EditModalProps = {
    payload: CryptoStructure
    open: boolean
    cancel?: Function
}

function EditCrytoModal({ payload, cancel, open = false }: EditModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputAmount, setInputAmount] = useState<number>(payload.amount);
    const [cryptoTemplate, setCryptoTemplate] = useState<CryptoStructure>({...payload})
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
        if (open) {
            setCryptoTemplate(payload)
            setInputAmount(payload.amount)           
            handleOpen()
        }
    }, [open])

    useEffect(() => {
        setCryptoTemplate((old) => {
            return {
                ...old,
                amount: inputAmount
            }
        })
    },[inputAmount])

    const handleCancel = () => {
        if(cancel){
            cancel()
        }
        handleClose()
    };

    const handleConfirm = () => {
        const {_id, ...cryptoBody } = cryptoTemplate
        EditCrypto(_id, cryptoBody);
        handleClose();
    };

    return (
        <div>
            {isModalOpen && (
                <Modal
                    title="Edit amount"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                >
                    <h2>{cryptoTemplate.name}</h2>
                    <NumberInput
                        id="quantity"
                        value={inputAmount}
                        onChange={setInputAmount}
                        min={0}
                        max={100000}
                        step={0.00001}
                        placeholder="Enter a amount"
                    />
                </Modal>
            )}
        </div>
    );
}

export default EditCrytoModal