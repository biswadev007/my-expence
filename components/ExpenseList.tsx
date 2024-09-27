'use client';
import React, { useContext } from 'react'

import ExpenseCard from './ExpenseCard';
import ExpenseContext from '../services/useExpense';

const ExpenseList = () => {
  const expenseContext = useContext(ExpenseContext);
  if (!expenseContext) throw new Error("ExpenseContext must be used within ExpenseProvider");
  const { expenses, deleteExpense } = expenseContext;

  const handleDelete = (id: string) => {
    deleteExpense(id);
  }

  return (
    <div className='p-4 mt-0 mb-10'>
      <h3 className='text-2xl font-bold'>List of Expense</h3>
      <div className='flex flex-col gap-2 mt-4'>
        {
          expenses.length === 0 ? (
            <p className='text-gray-500 text-center mt-4'>No expenses found</p>
          ) : (
            expenses.map((expense) => (
              <ExpenseCard key={expense.id} {...expense} onDelete={handleDelete} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default ExpenseList;