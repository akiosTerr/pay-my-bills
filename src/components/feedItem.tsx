import { FiExternalLink, FiTrash2, FiEdit } from "react-icons/fi";
import { removeRecurringBill } from "../api_actions/recurringBills";
import { feedItemType } from "./interfaces/interfaces";


interface proptype {
    itemProps: feedItemType
    updateFn: Function
}


function FeedItem({ itemProps, updateFn }: proptype) {
    const itemClass = 'feed-item '+ itemProps.billStatus
    const dueDateClass = 'expiration '+ itemProps.billStatus + '-color'

    const deleteItem = (id: string) => () => {
        const confirmation = window.confirm("Are you sure you want to delete the item?")
        if(confirmation) {
            removeRecurringBill(id)()
            updateFn()
        }
    }

    return (
        <div className={itemClass}>
            <div className="item-header">
                <div className="title-section">
                    <h1 className="feed-item-title">{itemProps.title}</h1>
                    <div className="options-buttons">
                        <a href={itemProps.gotoUrl} title="go to website bill" className="goto-url-btn" target="_blank">
                            <FiExternalLink />
                        </a>
                        <a href="#" onClick={deleteItem(itemProps._id)} title="delete bill" className="delete-item-btn">
                            <FiTrash2 />
                        </a>
                        <a href="#" title="edit bill" className="edit-item-btn">
                            <FiEdit />
                        </a>
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
                    <input className="current-price-input" type="text" name="current-price" id="current-price" />
                </div>
                <div className="previous-price-section">
                    <p className="previous-price-label">Previous Price:</p>
                    <p className="previous-price">{itemProps.previousPrice}</p>
                </div>
            </div>
            <div className="item-lower">

                <button className="pay-bill">PAY BILL</button>
            </div>
        </div>
    );
}

export default FeedItem;
