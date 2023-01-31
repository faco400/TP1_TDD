import { runMain } from "module"

type Table = Array<Array<number>>

const table_2022: Table = [
    [0.0, 1903.98, 0],
    [1903.98, 2826.65, 7.5],
    [2826.65, 3751.05, 15],
    [3751.05, 4664.68, 22.50],
    [4664.68, Infinity, 27.50]
]

const porcentage_value = 100;

function sum(list: number[]): number {
    return list.reduce((acc, value) => acc + value, 0)
}

function calculateBaseValue(incomeValues: number[], deductions: number[]): number {
    return sum(incomeValues) - sum(deductions)
}

function calculateBaseValuePerRange(baseValue: number, table: Table) {
    return table.map((range) => {
        if (baseValue > range[1]) {
            return range[1] - range[0]
        }
        if (baseValue < range[0]) {
            return 0
        }
        return baseValue - range[0]
    })
}

function calculateIRPFTaxPerRange(baseValues: number[], table: Table): number[] {
    return baseValues.map((value, i) => value * (table[i][2] / porcentage_value))
}

function calculateTotalRangeBaseValues(baseValues: number[]): number {
    return sum(baseValues)
}

function calculateTotalIRPF(values: number[]): number {
    return sum(values)
}

export {
    Table, 
    table_2022, 
    calculateBaseValue, 
    calculateBaseValuePerRange, 
    calculateIRPFTaxPerRange, 
    calculateTotalRangeBaseValues,
    calculateTotalIRPF
}