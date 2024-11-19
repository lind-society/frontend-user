// components/ui/Input.tsx

import * as React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import { cn } from '@/lib/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  prefixIcon?: React.ReactNode;
  inputSize?: 'sm' | 'md' | 'lg';
};

const sizeClasses = {
  sm: {
    height: 'h-8',
    paddingY: 'py-1.5',
    text: 'text-sm',
    paddingLeft: 'pl-9', // Adjusted for prefix icon
    paddingRight: 'pr-2.5', // Adjusted for toggle button
  },
  md: {
    height: 'h-10',
    paddingY: 'py-2',
    text: 'text-sm',
    paddingLeft: 'pl-10',
    paddingRight: 'pr-3',
  },
  lg: {
    height: 'h-12',
    paddingY: 'py-3',
    text: 'text-base',
    paddingLeft: 'pl-12',
    paddingRight: 'pr-4',
  },
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefixIcon, inputSize = 'md', ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const isPasswordType = type === 'password';

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    // Determine padding based on the presence of a prefix icon
    const inputPaddingLeft = prefixIcon ? 'pl-10' : 'pl-3';
    const currentSize = sizeClasses[inputSize as 'sm' | 'md' | 'lg'];

    return (
      <div className='relative flex items-center'>
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className='absolute left-4 pointer-events-none flex items-center justify-center'>
            {prefixIcon}
          </div>
        )}

        <input
          type={isPasswordType && isPasswordVisible ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded-md border border-neutral-200 bg-white pr-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
            currentSize.height,
            currentSize.paddingY,
            currentSize.text,
            inputPaddingLeft,
            className
          )}
          ref={ref}
          {...props}
        />

        {/* Password Visibility Toggle */}
        {isPasswordType && (
          <button
            type='button'
            className='absolute right-3 text-neutral-500 dark:text-neutral-400 focus:outline-none'
            onClick={togglePasswordVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {!isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
