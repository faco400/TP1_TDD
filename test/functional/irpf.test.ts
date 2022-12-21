import { effectiveRate } from '@src/effec';

describe('Effective rate',()=>{
  test.each([
    [5000,505.64,10.11],
    [7000, 1028.14,14.68],
    [10000,1743.14,17.43]
  ])('Calculate effective rate', (income,irpf,expected) => {
    expect(effectiveRate(irpf,income)).toEqual(expected)
  })

})