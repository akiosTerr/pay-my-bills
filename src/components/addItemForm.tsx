import { useState } from 'react';
import { RecurringBillAddRequest } from '../api_actions/interfaces/api_interfaces';
import { addRecurringBill } from '../api_actions/recurringBills';
import { useNavigate } from "react-router-dom";
import '../style/addItemForm.scss'

function AddItemForm() {
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [gotoUrl, setGotoUrl] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    
    const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeDueDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value)
    }
    const onChangeGotoUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
        setGotoUrl(e.target.value)
    }

    

    const validateFields = () => {
        const fields = [title,gotoUrl,dueDate]
        return fields.some(item => item.length < 2)
    }

    const onSubmitHandler = (e:any) => {
        e.preventDefault()
        const formObject: RecurringBillAddRequest = {
            title,
            gotoUrl,
            dueDate,
        }
        console.log(formObject)
        addRecurringBill(formObject,navigate)()
    }

    return (
    <form onSubmit={onSubmitHandler} className="add-item-form">
        <label className="item-title">bill Name:</label>
        <input value={title} onChange={onChangeTitle} className="title-input" type="text" name="title" id="billTitle-input" />    
        <label className="item-title">bill Url:</label>
        <input value={gotoUrl} onChange={onChangeGotoUrl} className="goto-input" type="text" name="gotoUrl" id="gotoUrl-input" />    
        <label className="item-title">expiration date:</label>
        <input onChange={onChangeDueDate} className="expire-input" min={1} max={31} type="number" name="due" id="expire-input" />    
        <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">SUBMIT</button>
    </form>
    );
}

export default AddItemForm;