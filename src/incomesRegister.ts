export interface IIncome {
    value: number;
    description: string;
}

const data: IIncome[] = []

export function createIncome(income: IIncome){
    data.push(income);
    return income;
}
