'use client';
import React, { useRef, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Input from './Input';
import ExpenseContext from '../services/useExpense';
import { ExpenseCategory } from '../type';

const expenseCategories = [
  'Food',
  'Transportation',
  'Housing',
  'Entertainment',
  'Other',
];

const AddExpense = () => {
  const expenseContext = useContext(ExpenseContext);
  if (!expenseContext) throw new Error("ExpenseContext must be used within ExpenseProvider");
  const { addExpense } = expenseContext;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.get('expenseName')) {
      newErrors.expenseName = 'Expense name is required';
    }
    if (!formData.get('expenseAmount')) {
      newErrors.expenseAmount = 'Expense amount is required';
    }
    if (!formData.get('expenseDate')) {
      newErrors.expenseDate = 'Expense date is required';
    }
    if (!formData.get('expenseCategory')) {
      newErrors.expenseCategory = 'Expense category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);

    if (validateForm(formData)) {
      const expenseData = {
        name: formData.get('expenseName') as string,
        amount: Number(formData.get('expenseAmount')),
        date: formData.get('expenseDate') as string,
        category: formData.get('expenseCategory') as ExpenseCategory,
        description: formData.get('expenseDescription') as string | undefined,
        image: formData.get('expenseImage') as File | undefined,
      };
      addExpense({ id: uuidv4(), ...expenseData });
      formRef.current.reset();
    } else {
      console.log('Form validation failed');
    }
  };

  return (
    <div className='p-4 mt-16'>
      <h3 className='text-2xl font-bold'>Add Expense</h3>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 mt-4'
      >
        <Input
          type='text'
          name='expenseName'
          placeholder='Expense Name'
          label='Expense Name'
          required
          error={errors.expenseName}
        />
        <Input
          type='number'
          name='expenseAmount'
          placeholder='Expense Amount'
          label='Expense Amount'
          required
          error={errors.expenseAmount}
        />
        <Input
          type='date'
          name='expenseDate'
          placeholder='Expense Date'
          label='Expense Date'
          required
          error={errors.expenseDate}
        />
        <div className='flex flex-col gap-2'>
          <label htmlFor='expenseCategory'>Expense Category</label>
          <select
            id='expenseCategory'
            name='expenseCategory'
            className='border border-gray-300 rounded-md p-2 w-full h-10'
            required
          >
            <option value=''>Select a category</option>
            {expenseCategories.map((category, index) => (
              <option className='p-2' key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.expenseCategory && (
            <p className='text-red-500 text-sm'>{errors.expenseCategory}</p>
          )}
        </div>
        <div>
          <label htmlFor='expenseDescription'>Expense Description</label>
          <textarea
            name='expenseDescription'
            className='border border-gray-300 rounded-md p-2 mt-2 w-full h-auto'
            placeholder='Expense Description'
          />
        </div>
        <Input
          type='file'
          name='expenseImage'
          placeholder='Expense Image'
          label='Expense Image'
        />
        <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
