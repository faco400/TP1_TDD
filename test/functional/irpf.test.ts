import app from '@src/index';
import {
  table_2022, 
  calculateBaseValue, 
  calculateBaseValuePerRange, 
  calculateIRPFTaxPerRange, 
  calculateTotalRangeBaseValues, 
  calculateTotalIRPF} from '@src/calc';
import { effectiveRate } from '@src/effec';
import request from "supertest";
import { IIncome, registerIncome, calculateIncomeTotals } from '@src/incomesRegister';
import {
  createDeduction,
  IDeduction,
  calculateDeductionTotals,
  IDependent,
  addDependent,
  addDependentsList,
} from "@src/deductionsRegister";

describe('Income tests', () => {
  test('Should create income by falsificate data', () => {
    const data: IIncome = {
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    }
    const res: any = registerIncome(data);
    expect(res.statusCode).toEqual(200);
    expect(res.response.pop()).toEqual({
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    });
    expect(res.totalIncomes).toEqual(3000);
  });

  test('Should create a income by duplicate data', () => {
    const data: IIncome[] = [
      {
        value: 4000,
        description: "Rendimento referente ao salário.",
      },
      {
        value: 1000,
        description: "Rendimento dividendos.",
      },
      {
        value: 1500,
        description: "Renda Extra",
      }
    ];
    let totalIncome = 0;
    data.map((income) => {
      const res: any = registerIncome(income);
      expect(res.statusCode).toEqual(200);
      const lastIncome = res.response.pop()
      expect(lastIncome).toEqual(income)
      totalIncome += res.totalIncomes;
    })
    expect(totalIncome).toEqual(calculateIncomeTotals(data))
  });

  test('Should create a income by triangulate data', () => {
    const data: IIncome[] = [
      {
        value: 4000,
        description: "Rendimento referente ao salário.",
      },
      {
        value: 1000,
        description: "Rendimento dividendos.",
      },
      {
        value: 1500,
        description: "Renda Extra.",
      },
      {
        value: 2500,
        description: "Participação em lucro empresarial.",
      },
      {
        value: 1500,
        description: "Lucro na bolsa de valores.",
      }
    ];
    let totalIncome = 0;
    data.map((income) => {
      const res: any = registerIncome(income);
      expect(res.statusCode).toEqual(200);
      const lastIncome = res.response.pop()
      expect(lastIncome).toEqual(income)
      totalIncome += res.totalIncomes;
    })
    expect(totalIncome).toEqual(calculateIncomeTotals(data))
  });

  test('Should test the exception of type ValorRendimentoInvalidoException', () => {
    const data: IIncome[] = [
      {
        value: -1000,
        description: "Rendimento referente ao salário.",
      },
      {
        value: 0,
        description: "Rendimento dividendos.",
      },
      {
        value: Number(null),
        description: "Rendimento dividendos.",
      },
    ];
    data.map((income) => {
      const res: any = registerIncome(income);
      const exception = (res.response).toString()
      expect(res?.statusCode).toEqual(400);
      expect(exception).toEqual("Error: ValorRendimentoInvalidoException");
    });
  });

  test('Should test the exception of type DescricaoEmBrancoException', () => {
    const data: IIncome[] = [
      {
        value: 4000,
        description: "",
      },
    ];
    data.map((income) => {
      const res: any = registerIncome(income);
      const exception = (res.response).toString()
      expect(res?.statusCode).toEqual(400);
      expect(exception).toEqual("Error: DescricaoEmBrancoException");
    });
  });
});

describe("Register deductions test", () => {
  test.each([
    [
      [{ value: 5000, description: "Previdencia Privada" }],
      { totalDeduction: 5000 },
    ],
    [
      [
        { value: 500, description: "Pensao alimenticia" },
        { value: 2000, description: "Despesas com educacao" },
      ],
      { totalDeduction: 2500 },
    ],
    [
      [
        { value: 500, description: "Pensao alimenticia" },
        { value: 2000, description: "Despesas com educacao" },
        { value: 1500, description: "Despesas com saude" },
      ],
      { totalDeduction: 4000 },
    ],
  ])("Should register one or more deductions", (deductions, expected) => {
    let totalDeduction = 0;
    deductions.map((deduction) => {
      const res: any = createDeduction(deduction);
      expect(res.statusCode).toEqual(res.statusCode);
      const lastdeduction = res.response.pop();
      expect(lastdeduction).toEqual(deduction);
      totalDeduction += res.totalDeduction;
    });
    expect(totalDeduction).toEqual(expected.totalDeduction);
  });
});

describe('Should throw exception', () => {
  test.each([
    [{value: -1, description: "Despesas com saude"}, 'Error: ValorDeducaoInvalidoException'],
    [{value: 1000, description: ""}, 'Error: DescricaoEmBrancoException'],
    [{value: Number(null), description: "Despesas com educacao"}, 'Error: ValorDeducaoInvalidoException']
  ])('Throw any exception', (deduction, exception) =>{
      const res: any = createDeduction(deduction);
      expect(res.statusCode).toEqual(400);
      const res_error = (res.error).toString();
      expect(res_error).toEqual(exception);
  })
})


describe("Dependent addition test", () => {
  test.each([
    [
      {
        name: "Arthur Sena",
        birthDate: new Date("06/08/2000"),
      },
    ],
    [
      [
        {
          name: "Arthur Sena",
          birthDate: new Date("06/08/2000"),
        },
        {
          name: "Ayrton Sena",
          birthDate: new Date("20/04/2000"),
        },
      ],
    ],
    [{}],
  ])("Should add one or many dependents", (dependents) => {
    if (dependents?.hasOwnProperty("length")) {
      const res: any = addDependentsList(dependents as IDependent[]);

      expect(res?.statusCode).toEqual(200);
      expect(
        res?.response?.slice(
          // @ts-ignore
          res?.response?.length - dependents?.length,
          res?.response?.length
        )
      ).toEqual(dependents);
      return;
    }

    const res: any = addDependent(dependents as IDependent);

    // @ts-ignore
    if (!dependents?.name) {
      expect(res?.statusCode).toEqual(400);
      expect(res?.error?.message).toEqual("NomeEmBrancoException");
      return;
    }

    expect(res?.statusCode).toEqual(200);
    expect(res?.response?.pop()).toEqual(dependents);
  });
});

describe('Calculations for IRPF Tax', () => {
  test.each([
    [[1000.0], [], 1000.0],
    [[2000.0, 3000.0], [1000.0], 4000.0],
    [[1000.0, 2000.0], [500.0, 200.0], 2300.0]
  ])("Calculate base value of tax", (incomes, deductions, expected) => {
    expect(calculateBaseValue(incomes, deductions)).toBe(expected)
  })

  test.each([
    [1800.0, [1800.0, 0, 0, 0, 0]],
    [2291, [1903.98, 387.02, 0, 0, 0]],
    [9171.61, [1903.98, 922.67, 924.40, 913.63, 4506.93]]
  ])('Calculate Base Value per range', (baseValue, expected) => {
    expect(calculateBaseValuePerRange(baseValue, table_2022)).toEqual(expected.map((value) => expect.closeTo(value, 2)))
  })

  test.each([
    [[1000.0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
    [[1903.98, 387.02, 0, 0, 0], [0, 29.03, 0, 0, 0]],
    [[1903.98, 922.67, 924.40, 913.63, 4506.93], [0, 69.20, 138.66, 205.57, 1239.41]]
  ])('Calculate IRPF Tax value per range', (rangeValues, expected) => {
    expect(calculateIRPFTaxPerRange(rangeValues, table_2022)).toEqual(expected.map((value) => expect.closeTo(value, 2)))
  })

  test.each([
    [[1800.0, 0, 0, 0, 0], 1800.0],
    [[1903.98, 387.02, 0, 0, 0], 2291.0],
    [[1903.98, 922.67, 924.40, 913.63, 4506.93], 9171.61]
  ])('Sum range base values', (baseValues, expected) => {
    expect(calculateTotalRangeBaseValues(baseValues)).toEqual(expect.closeTo(expected, 2))
  })
  
  test.each([
    [[0, 29.03, 0, 0, 0], 29.03],
    [[0, 69.20, 138.66, 205.57, 1239.41], 1652.84],
    [[0, 69.20, 138.66, 160.37, 0], 368.23]
  ])('Calculate IRPF Total', (values, expected) => {
    expect(calculateTotalIRPF(values)).toEqual(expect.closeTo(expected, 2))
  })
})

describe('Effective rate',()=>{
  test.each([
    [5000,505.64,10.11],
    [7000, 1028.14,14.68],
    [10000,1743.14,17.43]
  ])('Calculate effective rate', (income,irpf,expected) => {
    expect(effectiveRate(irpf,income)).toEqual(expected)
  })

})
