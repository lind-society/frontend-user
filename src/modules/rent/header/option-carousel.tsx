'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';

interface OptionCarouselProps {
  children: React.ReactNode;
  className?: string;
}

const OptionCarousel: React.FC<OptionCarouselProps> = ({
  children,
  className = '',
}) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollAmount = 200;

  const checkForArrows = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10); // 10px buffer
  };

  useEffect(() => {
    checkForArrows();
    window.addEventListener('resize', checkForArrows);
    return () => window.removeEventListener('resize', checkForArrows);
  }, []);

  const scrollLeft = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    setTimeout(checkForArrows, 300);
  };

  const scrollRight = () => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkForArrows, 300);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Left scroll button */}
      {showLeftArrow && (
        <div className='absolute left-0 top-1/2 z-10 -translate-y-1/2'>
          <Button
            variant='primary'
            size='icon'
            className='h-11 w-9 rounded-none'
            onClick={scrollLeft}
            aria-label='Scroll left'
          >
            <ChevronLeft className='h-5 w-5' />
          </Button>
        </div>
      )}

      {/* Right scroll button */}
      {showRightArrow && (
        <div className='absolute right-0 top-1/2 z-10 -translate-y-1/2'>
          <Button
            variant='primary'
            size='icon'
            className='h-11 w-9 rounded-none'
            onClick={scrollRight}
            aria-label='Scroll right'
          >
            <ChevronRight className='h-5 w-5' />
          </Button>
        </div>
      )}

      {/* Carousel content */}
      <div
        className='scrollbar-hide flex items-center gap-3 overflow-x-auto py-1'
        ref={carouselRef}
        onScroll={checkForArrows}
      >
        {children}
      </div>
    </div>
  );
};

export { OptionCarousel };
