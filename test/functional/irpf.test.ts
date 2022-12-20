import app from '@src/index';
import request from 'supertest';
import {createDeduction, IDeduction} from '@src/deductionsRegister'

describe('IRPF functional tests', () => {
  test('Should register a deduction', () => {
    const deduction: IDeduction = {
      value: 5000,
      description: 'Previdencia Privada',
    }
    expect(createDeduction(deduction)).toEqual({
      value: 5000,
      description: 'Previdencia Privada',
    })
  })
});
