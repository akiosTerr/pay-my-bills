import { useEffect, useState } from 'react';
import { RecurringBillsResponse } from 'api_actions/interfaces/api_interfaces';
import { getRecurringBills } from 'api_actions/recurringBills';
import 'style/mainfeed.scss'
import { feedItemType, HistoryItemType } from 'components/interfaces/interfaces';
import History from 'components/history';
import { getHistoryItems } from 'api_actions/history';
import FeedGroup from 'components/feedGroup';
import { UpdateHistoryCtx, UpdateBillsCtx } from 'Contexts'
import { uniq } from 'lodash'


function Mainfeed() {
    const [billCategories, setBillCategories] = useState<string[]>([])
    const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
    const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);

    const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {

        const formated = items.map(item => {

            return {
                _id: item._id,
                title: item.title,
                previousPrice: item.previousPrice,
                gotoUrl: item.gotoUrl,
                dueDate: item.dueDate,
                billStatus: item.billStatus,
                billCategory: item.billCategory,
            }
        })
        const categories = formated.map((item) => item.billCategory)
        setRecurringBills(formated)
        setBillCategories(uniq(categories))
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
            <h1 className="main-title">My Finance data</h1>
            <div className="main-content">
                <UpdateHistoryCtx.Provider value={getHistoryItemsApiCall}>
                    <UpdateBillsCtx.Provider value={getRecurringBillsApiCall}>
                        <div className="main-feed">
                            {
                                billCategories.map((cat) => {
                                    const filtered_bills = recurringBills.filter((item) => item.billCategory === cat)
                                    return (
                                        <FeedGroup key={cat} categoryTitle={cat} itemProps={filtered_bills}></FeedGroup>
                                    )
                                })
                            }
                        </div>
                        <History historyItemArrayProp={historyItems}></History>
                    </UpdateBillsCtx.Provider>
                </UpdateHistoryCtx.Provider>

            </div>
        </>
    );
}

export default Mainfeed;