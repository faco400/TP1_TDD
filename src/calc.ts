function sum(list: number[]): number {
    return list.reduce((acc, value) => acc + value, 0)
}

function calculateBaseValue(incomeValues: number[], deductions: number[]): number {
    return sum(incomeValues) - sum(deductions)
}

export {calculateBaseValue}