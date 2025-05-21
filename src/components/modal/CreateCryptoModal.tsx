import { useEffect, useState } from "react"
import { addCryptoCurrency, NewCryptoInput } from "api_actions/cryptoService"
import Modal from "./Modal"
import NumberInput from "components/atoms/NumberInput"
import TextInput, { Label } from "components/atoms/TextInput"
import { styled } from "styled-components"

interface addNewCryptoProp {
    open: boolean
    cancel: Function
}

const InputWrapper = styled.div`
    display: inline-block;
`

function AddCryptoForm({ cancel, open = false }: addNewCryptoProp) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [urlname, setUrlName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [symbol, setSymbol] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)
    const [error, setError] = useState<string>();
    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
        if (open) {
            handleOpen()
        }
    }, [open])

    const onChangeUrlName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setUrlName(e.target.value.toLowerCase())
        }
    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onChangeSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setSymbol(e.target.value.toUpperCase())
        }
    }
    const onChangeAmount = (value: Number) => {
        setAmount(Number(value))
    }

    const clearFields = () => {
        setUrlName("")
        setName("")
        setSymbol("")
        setAmount(0)
    }

    const handleCancel = () => {
        cancel()
        handleClose()
    };

    const handleConfirm = async () => {
        const newCrypto: NewCryptoInput = {
            name,
            urlname,
            symbol,
            amount
        }

        console.log(newCrypto);

        await addCryptoCurrency(newCrypto)
        cancel();
        handleClose();
    };

    return (
        <div>
            {isModalOpen && (
                <Modal
                    title="Create New Coin"
                    confirmLabel="Create"
                    cancelLabel="Cancel"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                >
                    <div>
                        <TextInput
                            label="Name"
                            type="text"
                            placeholder="Name"
                            onChange={onChangeName}
                            error={error}
                            required
                        />
                        <TextInput
                            label="Url Name"
                            type="text"
                            placeholder="coin"
                            onChange={onChangeUrlName}
                            error={error}
                            required
                        />
                        <TextInput
                            label="Symbol"
                            type="text"
                            placeholder="Symbol"
                            onChange={onChangeSymbol}
                            error={error}
                            required
                        />
                        <InputWrapper>
                            <Label htmlFor="amount">Total Balance:</Label>
                            <NumberInput
                                id="amount"
                                onChange={onChangeAmount}
                                value={amount}
                                min={0}
                                max={100000}
                                step={0.00001}
                                placeholder="Enter a amount"
                            />
                        </InputWrapper>
                    </div>

                </Modal>
            )}
        </div>
        // <tr>
        //     <td><TableTextInput onChange={onChangeName} placeholder="name" /></td>
        //     <td><TableTextInput onChange={onChangeSymbol} placeholder="symbol" /></td>
        //     <td><TableNumberInput onChange={onChangeAmount} placeholder="amount" type="number" /></td>
        //     <td><TableTextInput onChange={onChangeUrlName} placeholder="url name" /></td>
        //     <td colSpan={3}><CreateCryptoBtn onClick={onClickNewCrypto}>Create</CreateCryptoBtn></td>
        // </tr>
    )
}

export default AddCryptoForm