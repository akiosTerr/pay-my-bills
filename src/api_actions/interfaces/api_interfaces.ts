export interface RecurringBillsResponse {
    _id: string
    title: string
    previousPrice: string
    gotoUrl: string
    value: string
    dueDate: string
}

export interface RecurringBillAddRequest {
    title: string
    gotoUrl: string
    dueDate: string
}