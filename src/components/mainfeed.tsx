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
    // const list: feedItemType[] = [
    //     {
    //         title: 'EDP',
    //         prevPrice: 'R$ 100,00',
    //         goToUrl: 'https://google.com',
    //         expirationDate: '01/03/2022',
    //         billStatus: 'paid',
    //     },
    //     {
    //         title: 'SAEG',
    //         prevPrice: 'R$ 47,00',
    //         goToUrl: 'https://google.com',
    //         expirationDate: '02/03/2022',
    //         billStatus: 'safe',
    //     },
    //     {
    //         title: 'VIVO',
    //         prevPrice: 'R$ 120,00',
    //         goToUrl: 'https://google.com',
    //         expirationDate: '02/03/2022',
    //         billStatus: 'warning',
    //     },
    //     {
    //         title: 'TIM',
    //         prevPrice: 'R$ 50,00',
    //         goToUrl: 'https://google.com',
    //         expirationDate: '02/03/2022',
    //         billStatus: 'danger',
    //     },
    // ]

    const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
    
    const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {
        const getNextMonthDate = (expDay: string): string => {
            const currentDate = new Date
            const currentDay = currentDate.getDay()
            const dueDay = Number(expDay)
            if(dueDay > currentDay) {
                const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, dueDay);
                return nextMonthDate.toLocaleDateString('pt-br')
            } else {
                const currentMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dueDay);
                return currentMonthDate.toLocaleDateString('pt-br')
            }
        }
        const formatedBills = items.map( item => {
            const formated_bill: feedItemType = _.clone(item);
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