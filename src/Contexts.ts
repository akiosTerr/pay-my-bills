import { createContext } from 'react';

import { getRecurringBills } from 'api_actions/recurringBills';
import { getHistoryItems } from 'api_actions/history';


export const UpdateBillsCtx = createContext(getRecurringBills(() => null));
export const UpdateHistoryCtx = createContext(getHistoryItems(() => null));
