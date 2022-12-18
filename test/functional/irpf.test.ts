import app from '@src/index';
import {calculateBaseValue} from '@src/calc';
import request from 'supertest';

describe('Beach IRPF functional tests', () => {
  it('Should get main route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});

test('Calculate base value of tax with one income and without deductions', () => {
  const income: number[] = [1000.0]
  const deduction: number[] = []
  expect(calculateBaseValue(income, deduction)).toBe(1000.0)
})