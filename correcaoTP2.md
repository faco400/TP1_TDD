Correção Tp1
--

|   |Critério                                             |Nota(%) |Nota(ptos)|
|---|-----------------------------------------------------|--------|----------|  
| 1 |Ref.1: Extrair método (10 pts)                       |   00   |    00    |  
| 2 |Ref.2: Substituir método por objeto-método (15 pts)  |   00   |    00    |  
| 3 |Ref.3: Extrair constante (5 pts)                     |   100  |    05    |  
|   |**Total**                                            |        |    05    |  

* Observações:
  Analisada o commit "Refactoring: Extrai Metodo" da branch "extrair_metodo".
Não houve extração de método mas apenas um "mover método" de todo o corpo do
método de origem para uma nova função. 
  Analisando o commit "Refactoring: substituir metodo p/ metodo obj" da branch
o método createDeduction foi simplesmente movido para a classe Deduction. Não
utilizou referencias para a classe de origem. O método na classe de origem não
teve seu teor alterado pela instrucao que instancia o metodo-objeto e chama o
método computar (ou seu equivalente)
