import { createContext, useState, ReactNode, useMemo } from "react";

import { Expense } from "../type";

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  totalExpense: number;
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [expense, ...prevExpenses]);
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const totalExpense = useMemo(() => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, totalExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
