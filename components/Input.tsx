import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...props} ref={ref} className='border border-gray-300 rounded-md p-2 w-full h-10' />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
})

export default Input;