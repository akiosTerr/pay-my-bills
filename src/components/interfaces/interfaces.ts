export interface HistoryItemType {
    _id?: string
    title: string
    value: string
    paymentDate: string
    expirationDate: string
}

export interface feedItemType {
    _id: string
    title: string
    previousPrice: string
    gotoUrl: string
    dueDate: string
    billStatus?: string
}
