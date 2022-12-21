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

describe("IRPF functional tests", () => {
  test("Should add dependent", () => {
    const dependent: IDependent = {
      name: "Arthur Sena",
      birthDate: new Date("06/08/2000"),
    };

    const res: any = addDependent(dependent);

    expect(res?.statusCode).toEqual(200);
    expect(res?.response?.pop()).toEqual(dependent);
  });
  test("Should add many dependents", () => {
    const dependents: IDependent[] = [
      {
        name: "Arthur Sena",
        birthDate: new Date("06/08/2000"),
      },
      {
        name: "Ayrton Sena",
        birthDate: new Date("20/04/2000"),
      },
    ];

    const res: any = addDependentsList(dependents);

    expect(res?.statusCode).toEqual(200);
    expect(
      res?.response?.slice(
        res?.response?.length - dependents?.length,
        res?.response?.length
      )
    ).toEqual(dependents);
  });
  test("Should not be able to add dependent", () => {
    const dependent: IDependent = {} as IDependent;

    const res: any = addDependent(dependent);

    expect(res?.statusCode).toEqual(400);
    expect(res?.error?.message).toEqual("NomeEmBrancoException");
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
