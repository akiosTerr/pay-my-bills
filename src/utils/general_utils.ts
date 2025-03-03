export interface CryptoPrice {
    name: string
    current_price_usd: number
    current_price_brl: number
}

export const orderedMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export const convertDate = (date: string): string => {
    return date.split('/').reverse().join('-')
}

export const getRangeOfMonths = (first: number, last: number): Array<string> => {
    let months = []
    for (let i = first; i < last; i++) {
        months.push(orderedMonths[i])
    }
    return months
}

export const getMonthName = (month: number) => {
    return orderedMonths[month]
}

export const flatten = (arr: Array<any>): Array<any> => {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getDaysDifference = (date: string) => {
    const today = new Date();
    const inputDate = new Date(date);

    const difference = inputDate.getTime() - today.getTime();

    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysDifference
}

export const calculateBillStatus = (dayDifference: number) => {
    let status = ''
    switch (true) {
        case dayDifference < 1:
            status = 'danger'
            break;
        case dayDifference < 6:
            status = 'warning'
            break;
        case dayDifference < 15:
            status = 'safe'
            break;
        default:
            status = 'paid'
            break;
    }

    return status
}

export const getDayLabel = (daysDifference: number) => {
    if (daysDifference > 1) {
        return `${daysDifference} days remaining`;
    } else if (daysDifference === 1) {
        return `${daysDifference} day remaining`;
    } else if (daysDifference < 0) {
        return `${daysDifference} days late`;
    } else {
        return "Today is the day!";
    }
};

export const getPriceUsd = (name: string, currentPrice: CryptoPrice[]): number => {
    const price = currentPrice.find(item => item.name === name)
    if (price) return price.current_price_usd
    else return 0
}

export const getPriceBrl = (name: string, currentPrice: CryptoPrice[]): number => {
    const price = currentPrice.find(item => item.name === name)
    if (price) return price.current_price_brl
    else return 0
}
