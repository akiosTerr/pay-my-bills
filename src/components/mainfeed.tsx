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
        const formatedBills = items.map( item => {
            const formated_bill: feedItemType = _.clone(item);
            formated_bill.billStatus = 'paid';
            return formated_bill
        })
        setRecurringBills(formatedBills)
    }

    useEffect(getRecurringBills(setFormatedRecurringBills), [])


    return (
        <>
        <div className="main-feed">
            {
                recurringBills.map((item, i) => {
                    return (
                        <FeedItem key={i} itemProps={item}></FeedItem>
                    )
                })
            }
        </div>
        <History></History>
        </>
    );
}

export default Mainfeed;