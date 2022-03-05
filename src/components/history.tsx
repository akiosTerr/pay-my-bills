import '../style/history.scss';
import HistoryItem from "./historyItem";
import { HistoryItemType } from "./interfaces/interfaces";
// import Select from 'react-select'

interface HistoryArrayPropType {
    historyItemArrayProp : HistoryItemType[]
}

function History({historyItemArrayProp}: HistoryArrayPropType) {

    return ( 
        <div className="history">
            <h1 className="history-title">
                Payment History
            </h1>
            <div className="history-array">
                {historyItemArrayProp.map((item, i) => 
                    (
                        <>
                            <HistoryItem key={item._id} historyItemProp={item}></HistoryItem>
                            <hr className='line-separator' />
                        </>
                        
                    ))
                }
            </div>
            
        </div> 
    );
}

export default History;