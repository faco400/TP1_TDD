export interface IIncome {
    value: number;
    description: string;
}

export function registerIncome(income: IIncome) {
    try {
        const income = {
            value: 3000,
            description: "Dividendos recebidos por meio de fundos imobiliários"
        }
        if (income.value <= 0) throw new Error('ValorRendimentoInvalidoException');
        if (income.description === "") throw new Error('DescricaoEmBrancoException');
        return income;
    } catch (error) {
        return error
    }
}


