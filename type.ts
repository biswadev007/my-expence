export type ExpenseCategory = 'Food' | 'Transportation' | 'Housing' | 'Entertainment' | 'Other'; 

export type Expense = {
  id: string;
  name: string;
  amount: number;
  date: string | Date,
  category: ExpenseCategory,
  description?: string,
  image?: File
};