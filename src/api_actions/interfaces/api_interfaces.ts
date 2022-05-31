import { BillStatus } from "../../components/interfaces/interfaces"

export interface RecurringBillsResponse {
    _id: string
    title: string
    previousPrice: string
    gotoUrl: string
    value: string
    billStatus: BillStatus
    dueDate: string
}

export interface RecurringBillAddRequest {
    title: string
    gotoUrl: string
    dueDate?: Date
}

export interface HistoryAddRequest {
    title: string
    value: number
    paymentDate: Date
    expirationDate: string
    recurringBillId: string
}