import app from '@src/index';
import request from 'supertest';
import {createDeduction, IDeduction, calculateDeductionTotals} from '@src/deductionsRegister'

describe('IRPF functional tests', () => {
  test('Should register a deduction', () => {
    const deduction: IDeduction = {
      value: 5000,
      description: 'Previdencia Privada',
    }

    const res: any = createDeduction(deduction)
    expect(res.statusCode).toEqual(200)
    expect(res.response.pop()).toEqual({
      value: 5000,
      description: 'Previdencia Privada',
    })

    expect(res.totalDeduction).toEqual(5000)
  })

  test('Should register more than onde deduction', () => {
    const deductionlist: IDeduction[] = [
      {
        value: 500,
        description: 'Pensao alimenticia',
      },
      {
        value: 2000,
        description: 'Despesas com educacao',
      }
    ]
    let totalDeduction = 0;
    deductionlist.map((deduction) => {
      const res: any = createDeduction(deduction);
      expect(res.statusCode).toEqual(200);
      const lastdeduction = res.response.pop()
      expect(lastdeduction).toEqual(deduction)
      totalDeduction += res.totalDeduction
    })
    expect(totalDeduction).toEqual(calculateDeductionTotals(deductionlist))
  })

  test('Should register three different deductions', () => {
    const deductionlist: IDeduction[] = [
      {
        value: 500,
        description: 'Pensao alimenticia',
      },
      {
        value: 2000,
        description: 'Despesas com educacao',
      },
      {
        value: 1500,
        description: 'Despesas com saude',
      }
    ]
    let totalDeduction = 0;
    deductionlist.map((deduction) => {
      const res: any = createDeduction(deduction);
      expect(res.statusCode).toEqual(200);
      const lastdeduction = res.response.pop()
      expect(lastdeduction).toEqual(deduction)
      totalDeduction += res.totalDeduction
    })
    expect(totalDeduction).toEqual(calculateDeductionTotals(deductionlist))
  })
});
