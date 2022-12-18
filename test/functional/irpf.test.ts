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

test('Calculate base value of tax with more than one income and one deduction', () => {
  const income: number[] = [2000.0, 3000.0]
  const deduction: number[] = [1000.0]
  expect(calculateBaseValue(income, deduction)).toBe(4000.0)
})

test('Calculate base value of tax with more than one income and more than one deduction', () => {
  const income: number[] = [1000.0, 2000.00]
  const deduction: number[] = [500.0, 200.0]
  expect(calculateBaseValue(income, deduction)).toBe(2300.0)
})