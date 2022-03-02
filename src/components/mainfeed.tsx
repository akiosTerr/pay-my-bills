import * as React from 'react';
import { useEffect, useState } from 'react';
import { RecurringBillsResponse } from '../api_actions/interfaces/api_interfaces';
import { getRecurringBills } from '../api_actions/recurringBills';
import '../style/mainfeed.scss'
import FeedItem from './feedItem';
import { feedItemType } from './interfaces/interfaces';
import _ from 'lodash'
import History from './history';



function Mainfeed() {

    const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
    
    const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {
        
        const formatedBills = items.map( item => {
            const formated_bill: feedItemType = _.clone(item);
            //todo: Bill status calculation on Back-end
            formated_bill.billStatus = 'paid';
            formated_bill.dueDate = item.dueDate
            return formated_bill
        })
        setRecurringBills(formatedBills)
    }

    const executeApiCall = () => {
        getRecurringBills(setFormatedRecurringBills)()
    }

    useEffect(executeApiCall, [])


    return (
        <>
        <div className="main-feed">
            {
                recurringBills.map((item, i) => {
                    return (
                        <FeedItem updateFn={executeApiCall} key={i} itemProps={item}></FeedItem>
                    )
                })
            }
        </div>
        <History></History>
        </>
    );
}

export default Mainfeed;