import * as React from 'react';
import '../style/mainfeed.scss'
import FeedItem from './feedItem';
import {feedItemType} from './feedItem';



function Mainfeed() {
    const list: feedItemType[] = [
        {
            title: 'EDP',
            prevPrice: 'R$ 100,00',
            goToUrl: 'https://google.com',
            expirationDate: '01/03/2022',
            billStatus: 'paid',
        },
        {
            title: 'SAEG',
            prevPrice: 'R$ 47,00',
            goToUrl: 'https://google.com',
            expirationDate: '02/03/2022',
            billStatus: 'safe',
        },
        {
            title: 'VIVO',
            prevPrice: 'R$ 120,00',
            goToUrl: 'https://google.com',
            expirationDate: '02/03/2022',
            billStatus: 'warning',
        },
        {
            title: 'TIM',
            prevPrice: 'R$ 50,00',
            goToUrl: 'https://google.com',
            expirationDate: '02/03/2022',
            billStatus: 'danger',
        },
    ]

    return ( 
        <div className="main-feed">
            {
                list.map(item => {
                    return (
                        <>
                            <FeedItem itemProps={item}></FeedItem>
                        </>
                    )
                })
            }
        </div>
     );
}

export default Mainfeed;