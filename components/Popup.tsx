'use client';
import React from 'react';

const Popup: React.FC<{ onClose: () => void; onDelete: () => void }> = ({
  onClose,
  onDelete,
}) => {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[#00000080] backdrop-blur-md'>
      <div className='flex flex-col items-center justify-center h-auto bg-[#3b82f610] text-white backdrop-blur-md rounded-lg px-3 py-6'>
        <h1 className='text-2xl font-bold mb-3'>Delete Expense</h1>
        <p className='text-sm mb-4'>
          Are you sure you want to delete this expense?
        </p>
        <div className='flex gap-3 mt-3'>
          <button onClick={onDelete} className='px-4 py-2 bg-red-500 text-white rounded-md'>
            Delete
          </button>
          <button onClick={onClose} className='px-4 py-2 bg-gray-500 text-white rounded-md'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
