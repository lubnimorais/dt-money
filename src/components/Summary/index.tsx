import { useMemo } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg';

import { Container } from "./styles"

const Summary = () => {
  const { transactions } = useTransactions();

  // const totalDeposits = useMemo(() => {
  //   const total = transactions.reduce((accumulator, transaction) => {
  //     if (transaction.type === 'deposit') {
  //       return accumulator + transaction.value;
  //     }

  //     return accumulator;
  //   }, 0);

  //   return total;
  // }, [transactions]);

  const summary = useMemo(() => {
    const summary = transactions.reduce((accumulator, transaction) => {
      if (transaction.type === 'deposit') {
        accumulator.deposits += transaction.value;
        accumulator.total += transaction.value;

      } else if (transaction.type === 'withdraw'){
        accumulator.withdraws += transaction.value;
        accumulator.total -= transaction.value;
      }

      return accumulator;
    }, {
      deposits: 0,
      withdraws: 0,
      total: 0,
    })

    return summary;
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(summary.deposits)
            }
        </strong>
      </div>

      <div>
        <header>
          <p>Saidas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>- 
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.withdraws)
          }
        </strong>
      </div>

      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>
          {
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(summary.total)
          }
        </strong>
      </div>
    </Container>
  )
}

export { Summary }