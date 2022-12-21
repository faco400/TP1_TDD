import app from "@src/index";
import request from "supertest";
import {
  createDeduction,
  IDeduction,
  calculateDeductionTotals,
  IDependent,
  addDependent,
} from "@src/deductionsRegister";

describe("IRPF functional tests", () => {
  test("Should add dependent", () => {
    const dependent: IDependent = {
      name: "Arthur Sena",
      birthDate: new Date("06/08/2000"),
    };
    
    expect(addDependent(dependent)).toEqual(dependent);
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
