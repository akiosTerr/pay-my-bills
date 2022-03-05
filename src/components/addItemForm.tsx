import { useState } from 'react';
import { RecurringBillAddRequest } from '../api_actions/interfaces/api_interfaces';
import { addRecurringBill } from '../api_actions/recurringBills';
import { useNavigate } from "react-router-dom";
import '../style/addItemForm.scss'

function AddItemForm() {
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [gotoUrl, setGotoUrl] = useState<string>('');
    const [dueDate, setDueDate] = useState<Date | null>(null);
    
    const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeDueDate = (e:React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value)
        setDueDate(newDate)
    }
    const onChangeGotoUrl = (e:React.ChangeEvent<HTMLInputElement>) => {
        setGotoUrl(e.target.value)
    }

    

    const validateFields = () => {
        const fields = [title,gotoUrl]
        return fields.some(item => item.length < 2)
    }

    const onSubmitHandler = (e:any) => {
        e.preventDefault()
        if(!dueDate) return
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
        <input onChange={onChangeDueDate} className="expire-input" type="date" name="due" id="expire-input" />    
        <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">SUBMIT</button>
    </form>
    );
}

export default AddItemForm;