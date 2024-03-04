export interface HistoryItemType {
    _id: string
    title: string
    value: string
    paymentDate: string
    recurringBillGroupId: string
    expirationDate: string
}

export interface LineChartData {
    title: string
    data: LineChartValues[]
}

export interface feedItemType {
    _id: string
    title: string
    nextExpirationDate: string
    billCategory: string
    dayCountLabel: string
    dayCount: number
}

export interface LineChartDataComponent {
    labels: Array<string>
    datasets: Array<any>
}

interface LineChartValues {
    value: number
    expiration: string
}

export enum BillStatus {
    paid = "paid",
    safe = "safe",
    warning = "warning",
    danger = "danger",
}