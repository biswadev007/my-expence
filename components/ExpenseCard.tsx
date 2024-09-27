'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

import Popup from './Popup';
import { Expense } from '../type';

interface ExpenseCardProps extends Expense {
  onDelete: (id: string) => void;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({
  id,
  name,
  amount,
  date,
  category,
  onDelete,
}) => {
  const [offset, setOffset] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      if (eventData.dir === 'Left') {
        setOffset(Math.min(eventData.deltaX * -1, 100));
      }
    },
    onSwipedLeft: () => {
      if (offset > 30) {
        setIsDeleting(true);
      } else {
        setOffset(0);
      }
    },
    onSwipedRight: () => setOffset(0),
  });

  const renderCategory = () => {
    switch (category) {
      case 'Food':
        return (
          <Image alt='food' src={'/icons/food.png'} width={30} height={30} />
        );
      case 'Transportation':
        return (
          <Image
            alt='transportation'
            src={'/icons/travel.png'}
            width={30}
            height={30}
          />
        );
      case 'Entertainment':
        return (
          <Image
            alt='entertainment'
            src={'/icons/movie.png'}
            width={30}
            height={30}
          />
        );
      case 'Housing':
        return (
          <Image alt='rent' src={'/icons/rent.png'} width={30} height={30} />
        );
      case 'Other':
        return <h4 className='text-lg'>Other</h4>;
    }
  };

  return (
    <>
      <div
        {...handlers}
        className={`relative overflow-hidden transition-all duration-300 ${
          isDeleting ? 'h-0 opacity-0' : 'h-auto opacity-100'
        }`}
        style={{ transform: `translateX(${-offset}px)` }}
      >
        {isDeleting ? (
          <div className='absolute top-0 right-0 h-full w-[100px] bg-red-500 flex items-center justify-center'>
            <Image alt='delete' src='/icons/trash.svg' width={30} height={30} />
          </div>
        ) : null}
        <div className='border border-gray-300 bg-[#12121210] backdrop-blur-md rounded-xl p-2 w-full'>
          <div className='flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              {renderCategory()}
              <h6 className='text-sm'>{name}</h6>
            </div>
            <h6 className='text-sm'>{date.toLocaleString()}</h6>
          </div>
          <div className='flex justify-between items-center mt-2'>
            <h3 className='text-xl'>₹ {amount}</h3>
          </div>
        </div>
      </div>
      {isDeleting ? (
        <Popup
          onClose={() => {
            setIsDeleting(false);
            setOffset(0);
          }}
          onDelete={() => onDelete(id)}
        />
      ) : null}
    </>
  );
};

export default ExpenseCard;
