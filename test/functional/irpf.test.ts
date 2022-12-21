import app from '@src/index';
import request from 'supertest';
import {createDeduction, IDeduction, calculateDeductionTotals} from '@src/deductionsRegister'

describe('IRPF functional tests', () => {
  
});

describe('Register deductions test', () => {
  test.each([
    [[{value: 5000, description: 'Previdencia Privada',}], {totalDeduction: 5000}],
    [[{value: 500, description: 'Pensao alimenticia',},{value: 2000, description: 'Despesas com educacao',}], 
    {totalDeduction: 2500}],
    [[{value: 500, description: 'Pensao alimenticia',}, {value: 2000,  description: 'Despesas com educacao',}, {value: 1500,  description: 'Despesas com saude',}], 
    {totalDeduction: 4000}]
  ])('Should register one or more deductions', (deductions, expected) => {
    let totalDeduction = 0
    deductions.map((deduction) =>{
      const res: any = createDeduction(deduction);
      expect(res.statusCode).toEqual(res.statusCode);
      const lastdeduction = res.response.pop();
      expect(lastdeduction).toEqual(deduction);
      totalDeduction += res.totalDeduction
    })
    expect(totalDeduction).toEqual(expected.totalDeduction)
  })
}) 
