import { useState } from 'react';
import { RecurringBillAddRequest } from 'api_actions/interfaces/api_interfaces';
import { addRecurringBill } from 'api_actions/recurringBills';
import { useNavigate } from "react-router-dom";
import 'style/ItemForm.scss'
import withAuth from 'hoc/PrivateRoute';

function AddItemForm() {
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [billCategory, setBillCategory] = useState<string>('');
    const [expirationDay, setExpirationDay] = useState<number | null>(null);

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillCategory(e.target.value)
    }
    const onChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = Number(e.target.value)
        setExpirationDay(newDate)
    }

    const validateFields = () => {
        const fields = [title]
        const textFieldCheck = fields.some(item => item.length < 2)
        const dateFieldCheck = !expirationDay
        return  textFieldCheck || dateFieldCheck 
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        if(!expirationDay) return
        const formObject: RecurringBillAddRequest = {
            title,
            expirationDay,
            billCategory
        }
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
                bill Category:
            </label>
            <input value={billCategory} onChange={onChangeCategory} className="input-text title-input" type="text" name="category" id="billCategory-input" />
           
            <label className="label item-title">
                next expiration day number:
            </label>
            <input onChange={onChangeDueDate} className="input-text expire-input" type="number" name="due" id="expire-input" />
            <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">
                ADD NEW BILL
            </button>
        </form>
    );
}

export default withAuth(AddItemForm);