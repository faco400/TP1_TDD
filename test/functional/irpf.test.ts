import app from '@src/index';
import {Table, table_2022, calculateBaseValue, calculateBaseValuePerRange} from '@src/calc';
import request from 'supertest';

describe('Beach IRPF functional tests', () => {
  it('Should get main route', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});

test.each([
  [[1000.0], [], 1000.0],
  [[2000.0, 3000.0], [1000.0], 4000.0],
  [[1000.0, 2000.0], [500.0, 200.0], 2300.0]
])("Calculate base value of tax", (incomes, deductions, expected) => {
  expect(calculateBaseValue(incomes, deductions)).toBe(expected)
})

test('Calculate Base Value per range for number on 1° range', () => {
  const baseValue: number = 1800.0
  expect(calculateBaseValuePerRange(baseValue, table_2022)).toStrictEqual([1800.0, 0, 0, 0, 0])
})

test('Calculate Base Value per range on 2° range', () => {
  const baseValue: number = 2291.0
  expect(calculateBaseValuePerRange(baseValue, table_2022)).toStrictEqual([1903.98, 387.02, 0, 0, 0])
})