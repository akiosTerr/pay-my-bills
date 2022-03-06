import { useState } from 'react';
import { RecurringBillAddRequest } from '../api_actions/interfaces/api_interfaces';
import { addRecurringBill } from '../api_actions/recurringBills';
import { useNavigate } from "react-router-dom";
import '../style/ItemForm.scss'

function AddItemForm() {
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [gotoUrl, setGotoUrl] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value)
        setDueDate(newDate)
    }
    const onChangeGotoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGotoUrl(e.target.value)
    }



    const validateFields = () => {
        const fields = [title, gotoUrl]
        const textFieldCheck = fields.some(item => item.length < 2)
        const dateFieldCheck = !dueDate
        return  textFieldCheck || dateFieldCheck 
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        if(!dueDate) return
        const formObject: RecurringBillAddRequest = {
            title,
            gotoUrl,
            dueDate,
        }
        console.log(formObject)
        addRecurringBill(formObject, navigate)()
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-item-form">
            <h1 className="form-title">
                Put your bill information
            </h1>
            <label className="label item-title">
                bill Name:
            </label>
            <input value={title} onChange={onChangeTitle} className="input-text title-input" type="text" name="title" id="billTitle-input" />
            <label className="label item-title">
                bill Url:
            </label>
            <input placeholder='https://url.com' value={gotoUrl} onChange={onChangeGotoUrl} className="input-text goto-input" type="text" name="gotoUrl" id="gotoUrl-input" />
            <label className="label item-title">
                next expiration date:
            </label>
            <input onChange={onChangeDueDate} className="input-text expire-input" type="date" name="due" id="expire-input" />
            <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">
                ADD NEW BILL
            </button>
        </form>
    );
}

export default AddItemForm;