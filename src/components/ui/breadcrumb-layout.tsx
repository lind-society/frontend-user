'use client';

import { Slash } from 'lucide-react';
import React from 'react';

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

  // containerClassName = '',
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className='rounded-sm border border-bronze/25 bg-cream-light px-4 py-2'>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem
                className={
                  item.isActive
                    ? 'font-heading text-[15px] font-semibold text-bronze-600'
                    : 'text-[15px] text-ink-soft'
                }
              >
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
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
  );
};

export default BreadcrumbLayout;
