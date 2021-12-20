import { createContext, ReactNode, 
  useContext, useEffect, useState, useCallback } from 'react';

import { api } from './services/api';

interface ITransaction {
  id: number;
  title: string;
  value: number;
  type: 'deposit' | 'withdraw';
  category: string;
  createdAt: string;
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>

interface ITransactionsContextData {
  transactions: Array<ITransaction>;
  createTransaction: (transaction: ITransactionInput) => void;
}

interface ITransactionsProviderProps {
  children: ReactNode
}

const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData);

const TransactionsProvider = ({ children }: ITransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const createTransaction = useCallback(async (transaction: ITransactionInput) => {
    await api.post('/transactions', transaction);
  }, []);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )

}

function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}

export { TransactionsProvider, useTransactions }