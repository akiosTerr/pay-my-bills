import * as React from 'react';
import { useEffect, useState } from 'react';
import { RecurringBillsResponse } from '../api_actions/interfaces/api_interfaces';
import { getRecurringBills } from '../api_actions/recurringBills';
import '../style/mainfeed.scss'
import FeedItem from './feedItem';
import { feedItemType, HistoryItemType } from './interfaces/interfaces';
import _ from 'lodash'
import History from './history';
import { getHistoryItems } from '../api_actions/history';



function Mainfeed() {

    const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
    const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);
    
    const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {
        setRecurringBills(items)
    }
    
    const getRecurringBillsApiCall = () => {
        getRecurringBills(setFormatedRecurringBills)()
    }

    const getHistoryItemsApiCall = () => {
        getHistoryItems(setHistoryItems)()
    }
    
    useEffect(getHistoryItems(setHistoryItems), [])
    useEffect(getRecurringBillsApiCall, [])


    return (
        <>
        <div className="main-feed">
            {
                recurringBills.map(item => {
                    return (
                        <FeedItem updateHistory={getHistoryItemsApiCall} updateBills={getRecurringBillsApiCall} key={item._id} itemProps={item}></FeedItem>
                    )
                })
            }
        </div>
        <History historyItemArrayProp={historyItems}></History>
        </>
    );
}

export default Mainfeed;