import { uniqBy } from 'lodash';
import { useEffect, useState } from 'react';
import '../style/history.scss';
import { convertDate, orderedMonths } from '../utils/general_utils';
import HistoryItem from "./historyItem";
import { HistoryItemType } from "./interfaces/interfaces";
// import Select from 'react-select'

interface HistoryArrayPropType {
    historyItemArrayProp : HistoryItemType[]
}

interface monthOptionValues {
    monthLabel: string
    monthValue: number
    expirationDate: Date
}

function History({historyItemArrayProp}: HistoryArrayPropType) {
    const [allFilterMonths, setAllFilterMonths] = useState<monthOptionValues[]>([])
    const [currentFilterMonth, setCurrentFilterMonth] = useState<monthOptionValues | undefined>(undefined)
    
    useEffect(() => {
        setMonthValues()
    },[historyItemArrayProp])
   
    const selectOnChange = (e:any) => {
        const filterMonth = allFilterMonths.find(item => {
            return item.monthLabel === e.target.value
        })
        setCurrentFilterMonth(filterMonth)
    }

    const setMonthValues = () => {
        const monthValues = historyItemArrayProp.map(item => {
            const expirationDate = new Date(convertDate(item.expirationDate))
            const monthValue = expirationDate.getMonth()
            const monthLabel = `${orderedMonths[monthValue]} - ${expirationDate.getFullYear()}`
            return {
               monthLabel,
               monthValue,
               expirationDate
            }
        })

        const uniqueArray = uniqBy(monthValues,'monthLabel')
        uniqueArray.sort((a ,b) => {
            var c = a.expirationDate
            var d = b.expirationDate
            //@ts-ignore
            return d - c
        })
        setAllFilterMonths(uniqueArray)
        setCurrentFilterMonth(uniqueArray[0])
    }
    const filteredArrayProps = historyItemArrayProp.filter(item => {
        const itemDate = new Date(convertDate(item.expirationDate))
        return itemDate.getMonth() === currentFilterMonth?.monthValue
    })

    return ( 
        <div className="history">
            <div className="history-header">
                <h1 className="history-title">
                    Payment History
                </h1>
                <select onChange={selectOnChange} className='month-dropdown-select' name="month-filter" id="month-filter">
                    {allFilterMonths.map(item => (
                        <option key={item.monthLabel} className='month-option' value={item.monthLabel}>{item.monthLabel}</option>
                    ))}
                </select>
            </div>
            <div className="history-array">
                {filteredArrayProps.map((item) => 
                    (
                        <div key={item._id}>
                            <HistoryItem historyItemProp={item}></HistoryItem>
                            <hr className='line-separator' />
                        </div>
                        
                    ))
                }
            </div>
            
        </div> 
    );
}

export default History;