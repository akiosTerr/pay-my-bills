import { useEffect, useState } from 'react';
import { RecurringBillAddRequest, RecurringBillsResponse } from '../api_actions/interfaces/api_interfaces';
import { editRecurringBill, getOneRecurringBill } from '../api_actions/recurringBills';
import { useNavigate, useParams } from "react-router-dom";
import '../style/addItemForm.scss'


function EditItemForm() {
    let navigate = useNavigate();
    let { id } = useParams();

    const [title, setTitle] = useState<string>('');
    const [gotoUrl, setGotoUrl] = useState<string>('');
    const [recBill, setRecBill] = useState<RecurringBillsResponse>();

    useEffect(getOneRecurringBill(String(id),setRecBill),[])


    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const onChangeGotoUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGotoUrl(e.target.value)
    }

    const validateFields = () => {
        const fields = [title, gotoUrl]
        const textFieldCheck = fields.some(item => item.length < 2)
        return  textFieldCheck 
    }

    const onSubmitHandler = (e: any) => {
        e.preventDefault()
        const formObject: RecurringBillAddRequest = {
            title,
            gotoUrl,
        }
        editRecurringBill(String(id), formObject, navigate)()
    }

    const goToHome = () => {
        navigate('/')
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-item-form">
            <h1 className="form-title">
                Edit your bill information
            </h1>
            <div className="label-case">
                <label className="label item-title">
                    bill Name:
                </label>
                <p className="old-value"> {recBill?.title}</p>
            </div>
            <input value={title} onChange={onChangeTitle} className="input-text title-input" type="text" name="title" id="billTitle-input" />
            <div className="label-case">
                <label className="label item-title">
                    bill Url:
                </label>
                <p className="old-value"> {recBill?.gotoUrl}</p>
            </div>
            <input placeholder='https://url.com' value={gotoUrl} onChange={onChangeGotoUrl} className="input-text goto-input" type="text" name="gotoUrl" id="gotoUrl-input" />
            <button className="cancel-button" onClick={goToHome}>
                CANCEL
            </button>
            <button disabled={validateFields()} className="submit-button" type="submit" value="Submit">
                EDIT BILL
            </button>
        </form>
    );
}

export default EditItemForm;