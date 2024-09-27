'use client';
import React, { ReactNode } from 'react';

import { ExpenseProvider } from './useExpense';

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  return (
    <ExpenseProvider>
      {children}
    </ExpenseProvider>
  );
};

export default ContextProvider;