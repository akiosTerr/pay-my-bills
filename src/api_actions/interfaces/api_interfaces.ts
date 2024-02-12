
export interface RecurringBillsResponse {
    _id: string
    title: string
    billCategory: string
    nextExpirationDate: string
    expirationDay: number
    user: string
}

export interface RecurringBillAddRequest {
    title: string
    billCategory: string
    expirationDay?: Number
}

export interface LoginData {
    email: string
    password: string
}

export interface LoginResponse {
    token: string
}

export interface HistoryAddRequest {
    title: string
    value: number
    paymentDate: Date
    expirationDate: string
    recurringBillId: string
}