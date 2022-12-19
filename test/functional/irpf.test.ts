import app from '@src/index';
import {Table, table_2022, calculateBaseValue, calculateBaseValuePerRange, calculateIRPFTaxPerRange} from '@src/calc';
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

test.each([
  [1800.0, [1800.0, 0, 0, 0, 0]],
  [2291, [1903.98, 387.02, 0, 0, 0]],
  [9171.61, [1903.98, 922.67, 924.40, 913.63, 4506.93]]
])('Calculate Base Value per range', (baseValue, expected) => {
  expect(calculateBaseValuePerRange(baseValue, table_2022)).toEqual(expected.map((value) => expect.closeTo(value, 2)))
})

test('Calculate IRPF per Range with value on the first range', () => {
  const rangeValues = [1000.0, 0, 0, 0, 0]
  const expected = [0, 0, 0, 0, 0]
  expect(calculateIRPFTaxPerRange(rangeValues, table_2022)).toEqual(expected.map((value) => expect.closeTo(value, 2)))
})

test('Calculate IPRF per range with value on the second range', () => {
  const rangeValues = [1903.98, 387.02, 0, 0, 0]
  const expected = [0, 29.03, 0, 0, 0]
  expect(calculateIRPFTaxPerRange(rangeValues, table_2022)).toEqual(expected.map((value)=> expect.closeTo(value, 2)))
})

test('Calculate IPRF per range with value on the last range', () => {
  const rangeValues = [1903.98, 922.67, 924.40, 913.63, 4506.93]
  const expected = [0, 69.20, 138.66, 205.57, 1239.41]
  expect(calculateIRPFTaxPerRange(rangeValues, table_2022)).toEqual(expected.map((value)=> expect.closeTo(value, 2)))
})