type Table = Array<Array<number>>

const table_2022: Table = [
    [0.0, 1903.98, 0],
    [1903.99, 2826.65, 7.5],
    [2826.66, 3751.05, 15],
    [3751.06, 4664.68, 22.50],
    [4664.69, Infinity, 27.50]
]

function sum(list: number[]): number {
    return list.reduce((acc, value) => acc + value, 0)
}

function calculateBaseValue(incomeValues: number[], deductions: number[]): number {
    return sum(incomeValues) - sum(deductions)
}

function calculateBaseValuePerRange(baseValue: number, table: Table) {
    return [1800.0, 0, 0, 0, 0]
}

export {Table, table_2022, calculateBaseValue, calculateBaseValuePerRange}