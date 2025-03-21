'use client';

import { Slash } from 'lucide-react';
import React from 'react';

import BaseContainer from '@/components/layouts/container';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbLayoutProps {
  items: BreadcrumbItem[];
  className?: string;
  containerClassName?: string;
}

const BreadcrumbLayout: React.FC<BreadcrumbLayoutProps> = ({
  items,
  className = '',
  // containerClassName = '',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`border-y py-4 md:py-6 ${className}`}>
      <BaseContainer>
        <div className='rounded-md bg-white border px-3 py-1'>
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem
                    className={item.isActive ? 'font-semibold' : ''}
                  >
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  {/* Add separator between items, but not after the last item */}
                  {index < items.length - 1 && (
                    <BreadcrumbSeparator>
                      <Slash />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </BaseContainer>
    </div>
  );
};

export default BreadcrumbLayout;
