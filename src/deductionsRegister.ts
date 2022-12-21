export interface IDeduction {
  value: number;
  description: string;
}

const deductionlist: IDeduction[] = []

export function createDeduction(deduction: IDeduction) {
  try{
    const deduction = {
      value: 5000,
      description: 'Previdencia Privada',
    }
    if (deduction.value < 0)
      throw new Error('ValorRendimentoInvalidoException')
    if (deduction.description === "")
      throw new Error('DescricaoEmBrancoException')
    return deduction;
  }catch(error){
    return error;
  }
  return{
    
  } 
}
