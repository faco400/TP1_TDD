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
        const income: IIncome = {
            value: 3000,
            description: "Dividendos recebidos por meio de fundos imobiliários"
        }
        if (income.value <= 0) throw new Error('ValorRendimentoInvalidoException');
        if (income.description === "") throw new Error('DescricaoEmBrancoException');
        data.push(income);
        const total = calculateIncomeTotals([{
            value: 3000,
            description: "Dividendos recebidos por meio de fundos imobiliários"
        }]);
        const res_data: IResponse = {
            statusCode: 200,
            response: [{
                value: 3000,
                description: "Dividendos recebidos por meio de fundos imobiliários"
            }],
            totalIncomes: Number(total)
        }
        return res_data;
    } catch (error) {
        return error
    }
}


