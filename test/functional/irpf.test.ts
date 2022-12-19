import app from '@src/index';
import {Table, table_2022, calculateBaseValue, calculateBaseValuePerRange, calculateIRPFTaxPerRange, calculateTotalRangeBaseValues} from '@src/calc';
import request from 'supertest';
import { TextDecoderStream } from 'stream/web';

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

test.each([
  [[1000.0, 0, 0, 0, 0], [0, 0, 0, 0, 0]],
  [[1903.98, 387.02, 0, 0, 0], [0, 29.03, 0, 0, 0]],
  [[1903.98, 922.67, 924.40, 913.63, 4506.93], [0, 69.20, 138.66, 205.57, 1239.41]]
])('Calculate IRPF Tax value per range', (rangeValues, expected) => {
  expect(calculateIRPFTaxPerRange(rangeValues, table_2022)).toEqual(expected.map((value) => expect.closeTo(value, 2)))
})

test('Sum range base values', () => {
  const baseValues = [1800.0, 0, 0, 0, 0]
  const expected = 1800.0
  expect(calculateTotalRangeBaseValues(baseValues)).toEqual(expect.closeTo(expected, 2))
})

test('Sum range base values 2', () => {
  const baseValues = [1903.98, 387.02, 0, 0, 0]
  const expected = 2291
  expect(calculateTotalRangeBaseValues(baseValues)).toEqual(expect.closeTo(expected, 2))
})

test('Sum range base values 3', () => {
  const baseValues = [1903.98, 922.67, 924.40, 913.63, 4506.93]
  const expected = 9171.61
  expect(calculateTotalRangeBaseValues(baseValues)).toEqual(expect.closeTo(expected, 2))
})