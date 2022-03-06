import * as React from 'react';
import { useEffect, useState } from 'react';
import { RecurringBillsResponse } from '../api_actions/interfaces/api_interfaces';
import { getRecurringBills } from '../api_actions/recurringBills';
import '../style/mainfeed.scss'
import FeedItem from '../components/feedItem';
import { feedItemType, HistoryItemType } from '../components/interfaces/interfaces';
import History from '../components/history';
import { getHistoryItems } from '../api_actions/history';



function Mainfeed() {

    const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
    const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);

    const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {

        const formated = items.map(item => {
            const dateformat = new Date(item.dueDate)
            return {
                _id: item._id,
                title: item.title,
                previousPrice: item.previousPrice,
                gotoUrl: item.gotoUrl,
                dueDate: dateformat.toLocaleDateString(),
                billStatus: item.billStatus,
            }
        })
        setRecurringBills(formated)
    }

    const getRecurringBillsApiCall = () => {
        getRecurringBills(setFormatedRecurringBills)()
    }

    const getHistoryItemsApiCall = () => {
        getHistoryItems(setHistoryItems)()
    }

    useEffect(getHistoryItemsApiCall, [])
    useEffect(getRecurringBillsApiCall, [])


    return (
        <>
            <h1 className="main-title">Pay My Bills 0.1.0</h1>
            <div className="main-content">
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
            </div>
        </>
    );
}

export default Mainfeed;