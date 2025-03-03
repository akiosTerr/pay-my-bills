import { useState } from "react"
import { CreateCryptoBtn, TableNumberInput, TableTextInput } from "./cryptoTable.style"
import { addCryptoCurrency, NewCryptoInput } from "api_actions/cryptoService"

interface addNewCryptoProp {
    addNewCrypto: Function
}

function AddCryptoForm({ addNewCrypto }: addNewCryptoProp) {
    const [urlname, setUrlName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [symbol, setSymbol] = useState<string>("")
    const [amount, setAmount] = useState<number>(0)

    const onChangeUrlName = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value) {
            setUrlName(e.target.value.toLowerCase())
        }
    }
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onChangeSymbol = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value){
            setSymbol(e.target.value.toUpperCase())
        }
    }
    const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value))
    }

    const clearFields = () => {
        setUrlName("")
        setName("")
        setSymbol("")
        setAmount(0)
    }

    const onClickNewCrypto = async () => {
        const newCrypto: NewCryptoInput = {
            name,
            urlname,
            symbol,
            amount
        }

        const response = await addCryptoCurrency(newCrypto)
        clearFields()
        addNewCrypto(response)
    }

    return (
        <tr>
            <td><TableTextInput onChange={onChangeName} placeholder="name" /></td>
            <td><TableTextInput onChange={onChangeSymbol} placeholder="symbol" /></td>
            <td><TableNumberInput onChange={onChangeAmount} placeholder="amount" type="number" /></td>
            <td><TableTextInput onChange={onChangeUrlName} placeholder="url name" /></td>
            <td colSpan={3}><CreateCryptoBtn onClick={onClickNewCrypto}>Create</CreateCryptoBtn></td>
        </tr>
    )
}

export default AddCryptoForm