export interface IDeduction {
  value: number;
  description: string;
}

const deductionlist: IDeduction[] = []
export interface DeductionResponse {
  statusCode: number,
  response: IDeduction[],
  totalDeduction: number
}

export function calculateDeductionTotals (deductionlist: IDeduction[]){
  try{
    const totalDeduction = deductionlist.reduce(function (accumulator, deduction) {
      return accumulator + deduction.value;
    }, 0)
    return totalDeduction
  
  }catch (error){
    return error
  }
}

export function createDeduction(deduction: IDeduction) {
  try{
    if (deduction.value < 0)
      throw new Error('ValorRendimentoInvalidoException')
    if (deduction.description === "" || !deduction.description)
      throw new Error('DescricaoEmBrancoException')

    deductionlist.push(deduction)
    const total = calculateDeductionTotals(deductionlist)

    const res_data: DeductionResponse = {
      statusCode: 200,
      response: deductionlist,
      totalDeduction: Number(total)
    }
    return res_data;
  
  }catch(error){
    return error;
  }
}
