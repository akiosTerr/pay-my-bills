import { useEffect, useState } from "react";
import { FiExternalLink, FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { addHistoryItem } from "../api_actions/history";
import { removeRecurringBill } from "../api_actions/recurringBills";
import { BillStatus, feedItemType } from "./interfaces/interfaces";


interface proptype {
    itemProps: feedItemType
    updateBills: Function
    updateHistory: Function
}


function FeedItem({ itemProps, updateBills, updateHistory }: proptype) {
    const itemClass = 'feed-item ' + itemProps.billStatus
    const dueDateClass = 'expiration ' + itemProps.billStatus + '-color'
    const prevPrice = itemProps.previousPrice == 'no payments' ? itemProps.previousPrice : 'R$ ' + itemProps.previousPrice
    


    const [billValue, setBillValue] = useState<string>('');
    const [payBtnActiveValue, setPayBtnActiveValue] = useState<boolean>(false);

    useEffect(() => {
        const readyToPay = itemProps.billStatus === BillStatus.warning || itemProps.billStatus === BillStatus.danger
        const fieldNotEmpty = billValue.length > 1
        setPayBtnActiveValue(!(readyToPay && fieldNotEmpty))
    }, [billValue, payBtnActiveValue, itemProps])

    const deleteItem = (id: string) => () => {
        const confirmation = window.confirm("Are you sure you want to delete the item?")
        if (confirmation) {
            removeRecurringBill(id, updateBills)()
        }
    }

    const onChangeBillValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBillValue(e.target.value)
    }

    const showUrl = () => {
        const show = itemProps.gotoUrl.slice(0, 4) === 'http'
        if (show) {
            return (
                <a href={itemProps.gotoUrl} title="go to website bill" className="btn goto-url-btn" rel="noreferrer" target="_blank">
                    <FiExternalLink />
                </a>
            )
        } else {
            return null
        }
    }

    const payBill = () => {
        if (billValue.length > 1) {
            const currentDate = new Date()
            const historyObj = {
                title: itemProps.title,
                value: billValue,
                paymentDate: currentDate,
                expirationDate: itemProps.dueDate,
                recurringBillId: itemProps._id,
            }
            addHistoryItem(historyObj, updateHistory, updateBills)()
            setBillValue('')
        }
    }

    return (
        <div className={itemClass}>
            <div className="item-header">
                <div className="title-section">
                    <h1 className="feed-item-title">{itemProps.title}</h1>
                    <div className="options-buttons">
                        {showUrl()}
                        <Link to={`edit/${itemProps._id}`} title="edit bill" className="btn edit-item-btn">
                            <FiEdit />
                        </Link>
                        <button onClick={deleteItem(itemProps._id)} title="delete bill" className="btn delete-item-btn">
                            <FiTrash2 />
                        </button>
                    </div>
                </div>
                <div className="expiration-section">
                    <p className="expiration-label">Due</p>
                    <p className={dueDateClass}>{itemProps.dueDate}</p>
                </div>
            </div>
            <div className="item-body">
                <div className="current-price-section">
                    <p className="current-price-label">current price:</p>
                    <input value={billValue} onChange={onChangeBillValue} className="current-price-input" type="text" name="current-price" id="current-price" />
                </div>
                <div className="previous-price-section">
                    <p className="previous-price-label">Previous Price:</p>
                    <p className="previous-price">{prevPrice}</p>
                </div>
            </div>
            <div className="item-lower">

                <button disabled={payBtnActiveValue} onClick={payBill} className="pay-bill">PAY BILL</button>
            </div>
        </div>
    );
}

export default FeedItem;
