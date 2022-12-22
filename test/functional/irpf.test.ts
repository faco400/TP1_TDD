import app from "@src/index";
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
