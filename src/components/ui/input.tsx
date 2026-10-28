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
      <div className='relative flex w-full items-center'>
        {/* Prefix Icon */}
        {prefixIcon && (
          <div className='absolute left-4 pointer-events-none flex items-center justify-center'>
            {prefixIcon}
          </div>
        )}

        <input
          type={isPasswordType && isPasswordVisible ? 'text' : type}
          className={cn(
            'flex h-10 w-full rounded border border-bronze/30 bg-cream-light pr-3 py-2 text-sm ring-offset-cream-light file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
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
            className='absolute right-3 text-ink-muted focus:outline-none'
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
