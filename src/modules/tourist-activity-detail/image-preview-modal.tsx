'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import Image from 'next/image';
import React from 'react';

import { cn } from '@/lib/utils';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';

const ModalDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-transparent p-0 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
ModalDialogContent.displayName = DialogPrimitive.Content.displayName;

interface ImagePreviewModalProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  startIndex?: number;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  images,
  isOpen,
  onClose,
  startIndex = 0,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <ModalDialogContent className='p-0 bg-transparent border-0 flex items-center justify-center w-full h-fit '>
        <DialogTitle>
          <span></span>
        </DialogTitle>
        <Carousel
          opts={{
            loop: true,
            startIndex: startIndex,
          }}
          className='w-full max-w-5xl'
        >
          <CarouselContent className='flex items-center'>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className='flex items-center justify-center p-4'>
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    width={0}
                    sizes='100vw'
                    height={0}
                    className='w-auto h-auto max-w-full max-h-[90vh] object-contain'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </ModalDialogContent>
    </Dialog>
  );
};

export default ImagePreviewModal;
