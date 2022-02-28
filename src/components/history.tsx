import HistoryItem from "./historyItem";
import '../style/history.scss'
import { HistoryItemType } from "./interfaces/interfaces";
import { useEffect, useState } from "react";
import { getHistoryItems } from "../api_actions/history";
// import Select from 'react-select'


function History() {
    const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);
    
    useEffect(getHistoryItems(setHistoryItems), [])

    return ( 
        <div className="history">
            <h1 className="history-title">
                Payment History
            </h1>
            <div className="history-array">
                {historyItems.map((item, i) => 
                    (
                        <HistoryItem key={item._id} historyItemProp={item}></HistoryItem>
                    ))
                }
            </div>
            
        </div> 
    );
}

export default History;