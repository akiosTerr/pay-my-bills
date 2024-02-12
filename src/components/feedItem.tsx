import { useEffect, useState, useContext } from "react";
import { FiExternalLink, FiTrash2, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { addHistoryItem } from "api_actions/history";
import { removeRecurringBill } from "api_actions/recurringBills";
import { BillStatus, feedItemType } from "components/interfaces/interfaces";
import { UpdateBillsCtx, UpdateHistoryCtx } from 'Contexts'


interface proptype {
    itemProps: feedItemType
}


function FeedItem({ itemProps}: proptype) {
    // const itemClass = 'feed-item ' + itemProps.billStatus
    // const dueDateClass = 'expiration ' + itemProps.billStatus + '-color'
    // const prevPrice = itemProps.previousPrice === 'no payments' ? itemProps.previousPrice : 'R$ ' + itemProps.previousPrice
    const dateformat = new Date(itemProps.nextExpirationDate).toLocaleDateString()
    const updateBillCtx = useContext(UpdateBillsCtx)
    const updateHistoryCtx = useContext(UpdateHistoryCtx)

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
        console.log(e.target)
        setBillValue(e.target.value)
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
        <div className="feed-item">
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
                    <p>{dateformat}</p>
                </div>
            </div>
            <div className="item-body">
                <div className="current-price-section">
                    <p className="current-price-label">current price:</p>
                    <input value={billValue} onChange={onChangeBillValue} className="current-price-input" pattern="[0-9]*" type="text" name="current-price" id="current-price" />
                </div>
            </div>
            <div className="item-lower">

                <button disabled={payBtnActiveValue} onClick={payBill} className="pay-bill">PAY BILL</button>
            </div>
        </div>
    );
}

export default FeedItem;
