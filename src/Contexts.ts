import { createContext, useContext } from 'react';

import { getRecurringBills } from 'api_actions/recurringBills';
import { getHistoryItems } from 'api_actions/history';

interface ProfileNameContextType {
    setProfileName: React.Dispatch<React.SetStateAction<string>>
    profileName: string
}
interface AuthContextType {
    isLoggedIn: boolean
    login: Function
    logout: Function
}



export const UpdateBillsCtx = createContext(getRecurringBills(() => null));
export const UpdateHistoryCtx = createContext(getHistoryItems(() => null));
export const SetProfileNameCtx = createContext<ProfileNameContextType | undefined>(undefined);
export const SetAuthCtx = createContext<AuthContextType | undefined>(undefined);

export const useUpdateBillsCtx = () => {
    return useContext(UpdateBillsCtx)
}
export const useUpdateHistoryCtx = () => {
    return useContext(UpdateHistoryCtx)
}
export const useSetProfileNameCtx = () => {
    return useContext(SetProfileNameCtx)
}
export const useAuthCtx = () => {
    return useContext(SetAuthCtx)
}

