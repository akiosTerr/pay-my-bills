import { useUpdateBillsCtx, useUpdateHistoryCtx } from 'Contexts';
import { addHistoryItem } from "api_actions/history";
import { removeRecurringBill } from "api_actions/recurringBills";
import { feedItemType } from "components/interfaces/interfaces";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { calculateBillStatus } from 'utils/general_utils';


interface proptype {
    itemProps: feedItemType
}


function FeedItem({ itemProps}: proptype) {
    const billStatus = calculateBillStatus(itemProps.dayCount)
    const dateformat = new Date(itemProps.nextExpirationDate).toLocaleDateString()
    const updateBillCtx = useUpdateBillsCtx()
    const updateHistoryCtx = useUpdateHistoryCtx()
    const maxLenght = 8

    const [billValue, setBillValue] = useState<string>('');
    const [payBtnActiveValue, setPayBtnActiveValue] = useState<boolean>(false);

    useEffect(() => {
        const readyToPay = true
        const fieldNotEmpty = billValue.length > 1
        setPayBtnActiveValue(!(readyToPay && fieldNotEmpty))
    }, [billValue, payBtnActiveValue, itemProps])

    const deleteItem = (id: string) => () => {
        const confirmation = window.confirm("Are you sure you want to delete the item?")
        if (confirmation) {
            removeRecurringBill(id, updateBillCtx)()
        }
    }

    const onChangeBillValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= maxLenght) {
            setBillValue(e.target.value)
        }
    }

    const payBill = () => {
        if (billValue.length > 0) {
            const currentDate = new Date()
            const historyObj = {
                title: itemProps.title,
                value: Number(billValue),
                paymentDate: currentDate,
                expirationDate: itemProps.nextExpirationDate,
                recurringBillId: itemProps._id,
            }
            addHistoryItem(historyObj, updateHistoryCtx, updateBillCtx)()
            setBillValue('')
        }
    }

    return (
        <div className={`feed-item ${billStatus}`}>
            <div className="item-header">
                <div className="title-section">
                    <h1 className="feed-item-title">{itemProps.title}</h1>
                    <div className="options-buttons">
                        <button onClick={deleteItem(itemProps._id)} title="delete bill" className="btn delete-item-btn">
                            <FiTrash2 />
                        </button>
                        <Link to={`edit/${itemProps._id}`} title="edit bill" className="btn edit-item-btn">
                            <FiEdit />
                        </Link>
                    </div>
                </div>
                <div className="days-count">
                    <h3>{itemProps.dayCountLabel}</h3>
                </div>
                <div className="expiration-section">
                    <p className="expiration-label">Due</p>
                    <p className={`expiration ${billStatus}`}>{dateformat}</p>
                </div>
            </div>
            <div className="item-body">
                <div className="current-price-section">
                    <p className="current-price-label">current price:</p>
                    <input value={billValue} maxLength={5} onChange={onChangeBillValue} className="current-price-input" type="number" name="current-price" id="current-price" />
                </div>
            </div>
            <div className="item-lower">

                <button disabled={payBtnActiveValue} onClick={payBill} className="pay-bill">PAY BILL</button>
            </div>
        </div>
    );
}

export default FeedItem;
