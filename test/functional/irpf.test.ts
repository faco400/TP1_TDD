import { IIncome, registerIncome } from '@src/incomesRegister';

describe('Income tests', () => {
  test('Should create income by falsificate data', () => {
    const data: IIncome = {
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    }
    expect(registerIncome(data)).toEqual({
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    })
  });
});
