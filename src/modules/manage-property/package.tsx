'use client';

import { Check, X } from 'lucide-react';
import React from 'react';
import { FaCrown, FaRegStar, FaStar } from 'react-icons/fa';

import { usePackages } from '@/hooks/api/usePackage';

import BaseContainer from '@/components/layouts/container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Cycled by tier position (lowest commission first) so a 3-tier lineup gets
// the same star / star-filled / crown progression the page always had.
const TIER_ICONS = [FaRegStar, FaStar, FaCrown];

interface FeatureRow {
  name: string;
  included: boolean[];
}

const PackageManageProperty = () => {
  const { data, isLoading } = usePackages({ limit: 20 });

  // Managed from the admin dashboard (Property Management > Package) —
  // ordered cheapest-to-most-complete so the visual tiering below still
  // makes sense regardless of the order they were created in.
  const packages = React.useMemo(() => {
    const list = data?.data.data ?? [];
    return [...list].sort(
      (a, b) => (a.commissionPercentage ?? 0) - (b.commissionPercentage ?? 0)
    );
  }, [data]);

  // "Most Popular" badge only makes sense for the classic 3-tier layout —
  // for any other count nothing is singled out.
  const highlightIndex = packages.length === 3 ? 1 : -1;

  // Every benefit title that appears on any package becomes one comparison
  // row; a package gets a check mark wherever it lists that benefit.
  const featureRows = React.useMemo<FeatureRow[]>(() => {
    const rows = new Map<string, boolean[]>();
    packages.forEach((pkg, pkgIndex) => {
      (pkg.benefits ?? []).forEach((benefit) => {
        if (!rows.has(benefit.title)) {
          rows.set(benefit.title, new Array(packages.length).fill(false));
        }
        rows.get(benefit.title)![pkgIndex] = true;
      });
    });
    return Array.from(rows.entries()).map(([name, included]) => ({
      name,
      included,
    }));
  }, [packages]);

  if (isLoading) {
    return (
      <div className='py-8 md:py-12 lg:py-[64px]'>
        <BaseContainer>
          <div className='hidden sm:grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-12'>
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className='h-[280px] animate-pulse rounded bg-sand/60'
              />
            ))}
          </div>
        </BaseContainer>
      </div>
    );
  }

  if (packages.length === 0) return null;

  const gridStyle = {
    gridTemplateColumns: `repeat(${packages.length + 1}, minmax(0, 1fr))`,
  };
  const tableHeaderStyle = {
    gridTemplateColumns: `repeat(${packages.length + 1}, minmax(0, 1fr))`,
  };

  return (
    <div className='py-8 md:py-12 lg:py-[64px]'>
      <BaseContainer>
        <>
          {/* Header section */}
          <div className='mb-8 md:mb-12 lg:mb-16 text-center'>
            <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4'>
              The Perfect Package Just for You!
            </h2>
            <p className='text-text text-base md:text-lg max-w-3xl mx-auto'>
              We help you manage your property with the best price at LIND
              Society, offering tailored solutions for every property owner's
              needs.
            </p>
          </div>

          {/* Package cards - Desktop & Tablet */}
          <div
            className='hidden sm:grid gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16'
            style={gridStyle}
          >
            {/* Package info column */}
            <div className='col-span-1 flex justify-end flex-col gap-8 pt-[100px]'>
              <div className='text-text font-medium'>
                <span className='text-lg md:text-xl'>Select your</span>
                <h3 className='text-2xl md:text-3xl font-bold text-primary mt-1'>
                  Management Package
                </h3>
              </div>
            </div>

            {packages.map((pkg, index) => {
              const Icon = TIER_ICONS[index % TIER_ICONS.length];
              const isHighlighted = index === highlightIndex;

              return (
                <div
                  key={pkg.id}
                  className={`col-span-1 rounded flex flex-col relative ${
                    isHighlighted
                      ? 'border-2 border-primary shadow-sm'
                      : 'border border-primary'
                  }`}
                >
                  {isHighlighted && (
                    <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                      <span className='bg-primary text-cream text-xs font-bold px-4 py-1 rounded-full'>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-6 flex flex-col gap-3 flex-grow ${
                      isHighlighted ? 'bg-primary text-cream' : ''
                    }`}
                  >
                    <div className='mb-2 flex min-w-0 items-center gap-2'>
                      <Icon
                        className={`shrink-0 text-2xl ${
                          isHighlighted ? 'text-cream' : 'text-bronze-600'
                        }`}
                      />
                      <span
                        className={`min-w-0 break-words text-xl font-bold md:text-2xl ${
                          isHighlighted ? '' : 'text-ink'
                        }`}
                      >
                        {pkg.name}
                      </span>
                    </div>
                    {pkg.commissionPercentage !== null && (
                      <>
                        <span
                          className={`font-bold text-xl md:text-2xl mb-1 ${
                            isHighlighted ? '' : 'text-primary'
                          }`}
                        >
                          {pkg.commissionPercentage}%
                        </span>
                        <span className='text-sm'>of rental revenue</span>
                      </>
                    )}
                    <p
                      className={`text-sm mt-4 flex-grow ${
                        isHighlighted ? '' : 'text-text'
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>
                  <Separator
                    className={isHighlighted ? 'bg-cream-light/20' : ''}
                  />
                  <div className={`p-6 ${isHighlighted ? 'bg-primary' : ''}`}>
                    <Button
                      variant={isHighlighted ? 'outline' : 'primary'}
                      className={`w-full ${
                        isHighlighted
                          ? 'bg-cream-light text-primary hover:bg-cream-light/90'
                          : ''
                      }`}
                    >
                      Choose Package
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Package cards - Mobile only */}
          <div className='sm:hidden space-y-6 mb-12'>
            {packages.map((pkg, index) => {
              const Icon = TIER_ICONS[index % TIER_ICONS.length];
              const isHighlighted = index === highlightIndex;

              return (
                <div
                  key={pkg.id}
                  className={`rounded relative ${
                    isHighlighted
                      ? 'border-2 border-primary shadow-sm'
                      : 'border border-primary overflow-hidden'
                  }`}
                >
                  {isHighlighted && (
                    <div className='absolute -top-3 left-0 right-0 flex justify-center'>
                      <span className='bg-primary text-cream text-xs font-bold px-4 py-1 rounded-full'>
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div
                    className={`p-5 flex flex-col gap-3 ${
                      isHighlighted ? 'bg-primary text-cream' : ''
                    }`}
                  >
                    <div className='flex items-center gap-2 mb-1'>
                      <Icon
                        className={`text-xl ${
                          isHighlighted ? 'text-cream' : 'text-primary'
                        }`}
                      />
                      <span
                        className={`font-bold text-xl ${
                          isHighlighted ? '' : 'text-text'
                        }`}
                      >
                        {pkg.name}
                      </span>
                    </div>
                    <div className='flex justify-between items-center'>
                      <div>
                        {pkg.commissionPercentage !== null && (
                          <>
                            <span className='font-bold text-xl'>
                              {pkg.commissionPercentage}%
                            </span>
                            <span className='text-xs ml-1'>
                              of rental revenue
                            </span>
                          </>
                        )}
                      </div>
                      <Button
                        variant={isHighlighted ? 'outline' : 'primary'}
                        size='sm'
                        className={
                          isHighlighted
                            ? 'bg-cream-light text-primary hover:bg-cream-light/90'
                            : ''
                        }
                      >
                        Choose
                      </Button>
                    </div>
                    <Separator
                      className={`my-2 ${
                        isHighlighted ? 'bg-cream-light/20' : ''
                      }`}
                    />
                    <p className='text-sm'>{pkg.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {featureRows.length > 0 && (
            <>
              {/* Comparison table heading */}
              <div className='text-center mb-8 md:mb-10'>
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold text-primary'>
                  Compare Plans
                </h3>
                <p className='text-text mt-2'>
                  Detailed feature comparison of all our management packages
                </p>
              </div>

              {/* Comparison table - Desktop & Tablet */}
              <div className='hidden sm:block overflow-hidden rounded border border-bronze/25 mb-8'>
                {/* Table header */}
                <div className='grid bg-bone border-b' style={tableHeaderStyle}>
                  <div className='col-span-1 p-4 md:p-5 font-semibold text-text'>
                    Features
                  </div>
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className='col-span-1 p-4 md:p-5 text-center font-semibold text-primary'
                    >
                      {pkg.name}
                    </div>
                  ))}
                </div>

                {/* Table rows */}
                {featureRows.map((row, index) => (
                  <div
                    key={index}
                    className='grid border-b last:border-b-0'
                    style={tableHeaderStyle}
                  >
                    <div className='col-span-1 p-4 md:p-5 flex items-center text-text'>
                      {row.name}
                    </div>
                    {row.included.map((included, pkgIndex) => (
                      <div
                        key={pkgIndex}
                        className='col-span-1 p-4 md:p-5 flex justify-center items-center'
                      >
                        {included ? (
                          <Check className='h-5 w-5 text-bronze-600' />
                        ) : (
                          <X className='text-ink-muted/60 h-5 w-5' />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Comparison table - Mobile only */}
              <div className='sm:hidden space-y-6'>
                {featureRows.map((row, index) => (
                  <div
                    key={index}
                    className='border rounded overflow-hidden border-bronze/25'
                  >
                    <div className='p-4 flex items-center justify-between border-b'>
                      <span className='font-medium text-text'>{row.name}</span>
                    </div>
                    <div
                      className='grid divide-x'
                      style={{
                        gridTemplateColumns: `repeat(${packages.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {packages.map((pkg, pkgIndex) => (
                        <div
                          key={pkg.id}
                          className='p-3 flex flex-col items-center gap-1'
                        >
                          <span className='text-xs text-text'>{pkg.name}</span>
                          {row.included[pkgIndex] ? (
                            <Check className='h-5 w-5 text-bronze-600' />
                          ) : (
                            <X className='text-ink-muted/60 h-5 w-5' />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      </BaseContainer>
    </div>
  );
};

export default PackageManageProperty;
