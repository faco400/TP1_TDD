import app from '@src/index';
import request from 'supertest';
import { createIncome, IIncome } from '@src/incomesRegister';

describe('IRPF functional tests', () => {
  test('Should create a income', () => {
    const data: IIncome = {
      value: 4000,
      description: "Rendimento referente ao salário.",
    }
    expect(createIncome(data)).toEqual({
      value: 4000,
      description: "Rendimento referente ao salário.",
    })
  });
});

