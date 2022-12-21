import { effectiveRate } from '@src/effec';

describe('Effective rate',()=>{
  test('Calculate effective rate - falsificação', () => {
    const income: number = 5000
    const irpf: number= 505.64
    expect(effectiveRate(irpf,income)).toEqual(10.11)
  })

  test('Calculate effective rate - duplicação', () => {
    const income: number = 7000
    const irpf: number= 1028.14
    expect(effectiveRate(irpf,income)).toEqual(14.68)
  })

})