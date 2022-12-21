import app from "@src/index";
import request from "supertest";
import {
  createDeduction,
  IDeduction,
  calculateDeductionTotals,
  IDependent,
  addDependent,
  addDependentsList,
} from "@src/deductionsRegister";

describe("IRPF functional tests", () => {});

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
