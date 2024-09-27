'use client';
import React, { useContext } from 'react';

import ExpenseContext from '@/services/useExpense';

const FootBar = () => {
  const expenseContext = useContext(ExpenseContext);
  if (!expenseContext)
    throw new Error('ExpenseContext must be used within ExpenseProvider');
  const { totalExpense } = expenseContext;
  return (
    <>
      {totalExpense > 0 ? (
        <div className='flex fixed bottom-0 border-t border-gray-300 justify-between items-center p-4 h-10 w-full bg-[#93c5fd40] backdrop-blur-md'>
          <h3 className='text-xl font-bold'>Total Expense: ₹ {totalExpense}</h3>
        </div>
      ) : null}
    </>
  );
};

export default FootBar;
