import { IIncome, registerIncome, calculateIncomeTotals } from '@src/incomesRegister';

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

  test('Should create a income by duplicate data', () => {
    const data: IIncome[] = [
      {
        value: 4000,
        description: "Rendimento referente ao salário.",
      },
      {
        value: 1000,
        description: "Rendimento dividendos.",
      },
      {
        value: 1500,
        description: "Renda Extra",
      }
    ];
    let totalIncome = 0;
    data.map((income) => {
      const res: any = registerIncome(income);
      expect(res.statusCode).toEqual(200);
      const lastIncome = res.response.pop()
      expect(lastIncome).toEqual(income)
      totalIncome += res.totalIncomes;
    })
    expect(totalIncome).toEqual(calculateIncomeTotals(data))
  });
});
