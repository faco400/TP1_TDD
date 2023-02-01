interface DeductionResponse {
  statusCode: number;
  response: IDeduction[];
  totalDeduction: number;
}

interface IDeduction {
  value: number;
  description: string;
}

export interface IDependent {
  name: string;
  birthDate: Date;
}

export class Deduction {
  deductionlist: IDeduction[];
  dependentslist: IDependent[];
  
  constructor() {
    this.deductionlist = [];
    this.dependentslist = [];
  }

  createDeduction(deduction: IDeduction){
    try {
      if (deduction.value < 0 || !deduction.value)
        throw new Error("ValorDeducaoInvalidoException");
      if (deduction.description === "" || !deduction.description)
        throw new Error("DescricaoEmBrancoException");

      this.deductionlist.push(deduction);
      const total = this.calculateDeductionTotals(this.deductionlist);

      const res_data = {
        statusCode: 200,
        response: this.deductionlist,
        totalDeduction: Number(total),
      };
      
      return res_data;
    } catch (error: any) {
      return {
        statusCode: 400,
        error: error,
      };
    }
  }

  calculateDeductionTotals(deductionlist: IDeduction[]) {
    try {
      const totalDeduction = deductionlist.reduce(function (
        accumulator,
        deduction
      ) {
        return accumulator + deduction.value;
      },
      0);
      return totalDeduction;
    } catch (error) {
      return error;
    }
  }

  addDependent(dependent: IDependent) {
    try {
      if (dependent.name === "" || !dependent.name)
        throw new Error("NomeEmBrancoException");
  
      this.dependentslist.push(dependent);
  
      return {
        statusCode: 200,
        response: this.dependentslist,
      };
    } catch (error) {
      return {
        statusCode: 400,
        error: error,
      };
    }
  }

  addDependentsList(dependents: IDependent[]) {
    try {
      dependents.forEach((item) => {
        this.addDependent(item);
      })
  
      return {
        statusCode: 200,
        response: this.dependentslist,
      };
    } catch (error) {
      return error;
    }
  }
}