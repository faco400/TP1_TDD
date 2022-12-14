export interface IIncome {
    value: number;
    description: string;
}
const data: IIncome[] = [];
export interface IResponse {
    statusCode: number;
    response: IIncome[];
    totalIncomes: number;
}

export function calculateIncomeTotals(data: IIncome[]) {
    try {
        const totalIncome = data.reduce(function (accumulator, income) {
            return accumulator + income.value
        }, 0);
        return totalIncome;
    } catch (error) {
        return error
    }
}

export function registerIncome(income: IIncome) {
    try {
        if (income.value <= 0 || !income.value) throw new Error('ValorRendimentoInvalidoException');
        if (income.description === "" || !income.description) throw new Error('DescricaoEmBrancoException');
        data.push(income);
        const total = calculateIncomeTotals(data);
        const res_data: IResponse = {
            statusCode: 200,
            response: data,
            totalIncomes: Number(total)
        }
        return res_data;
    } catch (error) {
        return {
            statusCode: 400,
            response: error
        }
    }
}
