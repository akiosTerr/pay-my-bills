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
        setRecurringBills(items)
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