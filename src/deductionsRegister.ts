export interface IDeduction {
  value: number;
  description: string;
}

const deductionlist: IDeduction[] = []

export function createDeduction(deduction: IDeduction) {
  deductionlist.push(deduction);
  return deduction
}
