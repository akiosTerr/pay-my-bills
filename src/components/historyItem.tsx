import { HistoryItemType } from "./interfaces/interfaces";


interface PropType {
    historyItemProp : HistoryItemType
}

function HistoryItem({historyItemProp}:PropType) {

    const valueformat = `R$ ${historyItemProp.value}`

    return ( 
        <div className="history-item">
            <h2 className="title">{historyItemProp.title}</h2>
            <div className="value-section">
                <h2 className="value">{valueformat}</h2>
            </div>
            <div className="paid-section">
                <p className="paid-label">Paid in:</p>
                <p className="date">{historyItemProp.paymentDate}</p>
            </div>
            <div className="exp-section">
                <p className="exp-label">Expired in:</p>
                <p className="date">{historyItemProp.expirationDate}</p>
            </div>
            
        </div>
     );
}

export default HistoryItem;