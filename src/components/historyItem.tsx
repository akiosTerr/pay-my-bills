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
            <p className="date">{historyItemProp.date}</p>
            <p className="value">{historyItemProp.value}</p>
        </div>
     );
}

export default HistoryItem;