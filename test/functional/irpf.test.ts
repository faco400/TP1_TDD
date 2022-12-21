import { IIncome, registerIncome } from '@src/incomesRegister';

describe('Income tests', () => {
  test('Should create income by falsificate data', () => {
    const data: IIncome = {
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    }
    const res: any = registerIncome(data);
    expect(res.statusCode).toEqual(200);
    expect(res.response.pop()).toEqual({
      value: 3000,
      description: "Dividendos recebidos por meio de fundos imobiliários"
    });
    expect(res.totalIncomes).toEqual(3000);
  });
});
