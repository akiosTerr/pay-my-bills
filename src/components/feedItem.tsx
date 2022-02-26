import { FiExternalLink } from "react-icons/fi";

export interface feedItemType {
    title: string
    prevPrice: string
    goToUrl: string
    expirationDate: string
    billStatus: string
}

interface proptype {
    itemProps: feedItemType
}


function FeedItem({ itemProps }: proptype) {
    const itemClass = 'feed-item '+ itemProps.billStatus
    const dueDateClass = 'expiration '+ itemProps.billStatus + '-color'

    return (
        <div className={itemClass}>
            <div className="item-header">
                <div className="title-section">
                    <h1 className="feed-item-title">{itemProps.title}</h1>
                    <FiExternalLink />
                </div>
                <div className="expiration-section">
                    <p className="expiration-label">Due</p>
                    <p className={dueDateClass}>{itemProps.expirationDate}</p>
                </div>
            </div>
            <div className="item-body">
                <div className="current-price-section">
                    <p className="current-price-label">current price:</p>
                    <input className="current-price-input" type="text" name="current-price" id="current-price" />
                </div>
                <div className="previous-price-section">
                    <p className="previous-price-label">Previous Price:</p>
                    <p className="previous-price">{itemProps.prevPrice}</p>
                </div>
            </div>
            <div className="item-lower">

                <button className="pay-bill">PAY BILL</button>
            </div>
        </div>
    );
}

export default FeedItem;
