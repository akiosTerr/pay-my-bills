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

export const getRangeOfMonths = (first: number,last: number): Array<string> => {
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

export const getDaysDifference = (date:string) => {
    const today = new Date();
    const inputDate = new Date(date);
    
    const difference = inputDate.getTime() - today.getTime();
    
    const daysDifference = Math.ceil(difference / (1000 * 60 * 60 * 24));

    if (daysDifference > 0) {
        return `${daysDifference} days remaining`;
    } else if (daysDifference < 0) {
        return `${-daysDifference} days passed`;
    } else {
        return 'Today is the day!';
    }
}