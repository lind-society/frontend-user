import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-neutral-500 dark:text-neutral-400', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { CiHeart } from 'react-icons/ci';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoEyeOutline } from 'react-icons/io5';

// Adjust the import path as necessary

interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: string;
  originalPrice?: string;
  discountPercentage?: string;
  showSaleBadge?: boolean;
  saleBadgeText?: string;
  saleBadgeColor?: string;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  imageAlt,
  title,
  price,
  originalPrice,
  discountPercentage,
  showSaleBadge = false,
  saleBadgeText = 'Sale',
  saleBadgeColor = 'bg-primary-red',
  onAddToCart,
}) => {
  return (
    <Link
      href='/products/DKS LHTR Oval SSS 06012121 Special Edition'
      className='relative group animate-fadeIn col-span-1 border rounded-xl pb-4 hover-card'
    >
      <div className=''>
        <div className='relative'>
          {/* Sale Badge */}
          {showSaleBadge && (
            <div className='absolute top-4 left-4 z-10'>
              <span
                className={`${saleBadgeColor} text-sm text-white h-fit px-3 py-1 rounded-md`}
              >
                {saleBadgeText}
              </span>
            </div>
          )}

          {/* Hover Icons */}
          <div className='absolute inset-0 p-8 z-10 flex justify-end'>
            <div className='opacity-0 group-hover:opacity-100 group-hover:flex flex-col gap-1.5 transition-opacity duration-300'>
              <button
                aria-label='Add to Wishlist'
                className='rounded-full w-10 h-10 flex items-center justify-center bg-white hover:bg-primary-blue transition-colors'
              >
                <CiHeart className='text-gray-custom-900 text-lg' />
              </button>
              <button
                aria-label='View Product'
                className='rounded-full w-10 h-10 flex items-center justify-center bg-white hover:bg-primary-blue transition-colors'
              >
                <IoEyeOutline className='text-gray-custom-900 text-lg' />
              </button>
            </div>
          </div>

          {/* Product Image */}
          <Image
            src={imageSrc}
            width={400} // Adjust as needed
            height={360} // Adjust as needed
            sizes='100vw'
            className='w-full object-cover object-right-bottom h-[360px] rounded-t-xl'
            alt={imageAlt}
          />
        </div>

        {/* Product Details */}
        <div className='flex justify-between mt-4 px-4 pb-2'>
          <div className='flex flex-col gap-1.5 text-start'>
            <span className='text-lg text-gray-900 min-h-[56px]'>{title}</span>
            <span className='font-semibold text-2xl text-gray-900'>
              {price}
            </span>
            {originalPrice && discountPercentage && (
              <div className='flex items-center gap-1.5'>
                <p className='text-xs text-gray-custom-400 line-through'>
                  {originalPrice}
                </p>
                <span className='py-[3px] px-2 flex items-center bg-gray-custom-200 text-[10px] rounded-sm text-gray-custom-500'>
                  {discountPercentage}
                </span>
              </div>
            )}
          </div>
          <div className='rounded-full bg-gray-custom-50 w-12 h-12 p-2.5 flex items-center justify-center group-hover:bg-primary-blue transition-colors'>
            <button
              aria-label='Add to Cart'
              onClick={onAddToCart}
              className='text-primary-blue group-hover:text-white transition-colors min-w-[36px] flex justify-center items-center'
            >
              <HiOutlineShoppingBag className='text-lg' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ProductCard,
};
