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
        const getNextMonthDate = (expDay: string): string => {
            const currentDate = new Date
            const currentDay = currentDate.getDay()
            const dueDay = Number(expDay)
            // requires validation if the payment was made in the present month
            // todo: remake the logic in the back-end
            if(dueDay < currentDay) {
                const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, dueDay);
                return nextMonthDate.toLocaleDateString('pt-br')
            } else {
                const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dueDay);
                return currentMonthDate.toLocaleDateString('pt-br')
            }
        }
        const formatedBills = items.map( item => {
            const formated_bill: feedItemType = _.clone(item);
            //todo: Bill status calculation on Back-end
            formated_bill.billStatus = 'paid';
            formated_bill.dueDate = getNextMonthDate(item.dueDate)
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