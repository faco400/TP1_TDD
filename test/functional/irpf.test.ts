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

  test('Should create a income by triangulate data', () => {
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
        description: "Renda Extra.",
      },
      {
        value: 2500,
        description: "Participação em lucro empresarial.",
      },
      {
        value: 1500,
        description: "Lucro na bolsa de valores.",
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

  test('Should test the exception of type ValorRendimentoInvalidoException', () => {
    const data: IIncome[] = [
      {
        value: -1000,
        description: "Rendimento referente ao salário.",
      },
      {
        value: 0,
        description: "Rendimento dividendos.",
      },
      {
        value: Number(null),
        description: "Rendimento dividendos.",
      },
    ];
    data.map((income) => {
      const res: any = registerIncome(income);
      const exception = (res.response).toString()
      expect(res?.statusCode).toEqual(400);
      expect(exception).toEqual("Error: ValorRendimentoInvalidoException");
    });
  });

  test('Should test the exception of type DescricaoEmBrancoException', () => {
    const data: IIncome[] = [
      {
        value: 4000,
        description: "",
      },
    ];
    data.map((income) => {
      const res: any = registerIncome(income);
      const exception = (res.response).toString()
      expect(res?.statusCode).toEqual(400);
      expect(exception).toEqual("Error: DescricaoEmBrancoException");
    });
  });
});
