import HistoryItem, { HistoryItemType } from "./historyItem";
import '../style/history.scss'
import Select from 'react-select'


function History() {
    const historyItems: HistoryItemType[] = [
        {
            title: 'EDP',
            value: 'R$ 120,00',
            date: '12/02/2022'
        },
        {
            title: 'SAEG',
            value: 'R$ 45,00',
            date: '15/02/2022'
        }
    ]
    const monthOptions = ['July', 'August'];

    return ( 
        <div className="history">
            <h1 className="history-title">
                Bill History
            </h1>
            {/* <Select options={monthOptions} /> */}
            <div className="history-array">
                {historyItems.map(item => 
                    (
                        <HistoryItem historyItemProp={item}></HistoryItem>
                    ))
                }
            </div>
            
        </div> 
    );
}

export default History;