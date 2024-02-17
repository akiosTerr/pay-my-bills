import { useEffect, useState } from "react";
import { RecurringBillsResponse } from "api_actions/interfaces/api_interfaces";
import { getRecurringBills } from "api_actions/recurringBills";
import "style/mainfeed.scss";
import {
  feedItemType,
  HistoryItemType,
} from "components/interfaces/interfaces";
import History from "components/historyModule";
import { getHistoryItems } from "api_actions/history";
import FeedGroup from "components/feedGroup";
import { UpdateHistoryCtx, UpdateBillsCtx, useAuthCtx } from "Contexts";
import { uniq } from "lodash";
import { getDayLabel, getDaysDifference } from "utils/general_utils";
import withAuth from "hoc/PrivateRoute";

function Mainfeed() {
  const [billCategories, setBillCategories] = useState<string[]>([]);
  const [recurringBills, setRecurringBills] = useState<feedItemType[]>([]);
  const [historyItems, setHistoryItems] = useState<HistoryItemType[]>([]);
  const authCtx = useAuthCtx();

  const setFormatedRecurringBills = (items: RecurringBillsResponse[]) => {
    const formated = items.map((item) => {
      const dayCount = getDaysDifference(item.nextExpirationDate);
      const dayCountLabel = getDayLabel(dayCount);
      return {
        _id: item._id,
        title: item.title,
        billCategory: item.billCategory,
        nextExpirationDate: item.nextExpirationDate,
        dayCountLabel,
        dayCount,
      };
    });
    const categories = formated.map((item) => item.billCategory);
    setRecurringBills(formated);
    setBillCategories(uniq(categories));
  };

  const getRecurringBillsApiCall = () => {
    if (authCtx) {
      getRecurringBills(setFormatedRecurringBills, authCtx.logout)();
    }
  };  

  const getHistoryItemsApiCall = () => {
    if (authCtx) {
      getHistoryItems(setHistoryItems, authCtx.logout)();
    }
  };

  useEffect(getHistoryItemsApiCall, []);
  useEffect(getRecurringBillsApiCall, []);

  return (
    <>
      <h1 className="main-title">My Payment data</h1>
      <div className="main-content">
        <UpdateHistoryCtx.Provider value={getHistoryItemsApiCall}>
          <UpdateBillsCtx.Provider value={getRecurringBillsApiCall}>
            <History historyItemArrayProp={historyItems}></History>
            <div className="main-feed">
              {billCategories.map((cat) => {
                const filtered_bills = recurringBills.filter(
                  (item) => item.billCategory === cat
                );
                return (
                  <FeedGroup
                    key={cat}
                    categoryTitle={cat}
                    itemProps={filtered_bills}
                  ></FeedGroup>
                );
              })}
            </div>
          </UpdateBillsCtx.Provider>
        </UpdateHistoryCtx.Provider>
      </div>
    </>
  );
}

export default withAuth(Mainfeed);
