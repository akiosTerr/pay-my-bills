export interface HistoryItemType {
    title: string
    value: string
    date: string
}

interface PropType {
    historyItemProp : HistoryItemType
}

function HistoryItem({historyItemProp}:PropType) {

    return ( 
        <div className="history-item">
            <h2 className="title">{historyItemProp.title}</h2>
            <div className="value-section">
                <h2 className="value">{historyItemProp.value}</h2>
            </div>
            <div className="paid-section">
                <p className="paid-label">Paid in:</p>
                <p className="date">{historyItemProp.date}</p>
            </div>
            <div className="exp-section">
                <p className="exp-label">Expired in:</p>
                <p className="date">{historyItemProp.date}</p>
            </div>
            
        </div>
     );
}

export default HistoryItem;