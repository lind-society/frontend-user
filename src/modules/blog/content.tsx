'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import { toBlogPost } from '@/lib/mappers/blog';
import { useBlogs } from '@/hooks/api/useBlog';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { BlogCard } from '@/components/ui/card/blog';
import Pagination from '@/components/ui/pagination';
import { StateMessage } from '@/components/ui/state-message';

const POSTS_PER_PAGE = 6;

const ContentBlog = () => {
  const states = useTranslations('states');

  // Pagination state — served by the API rather than sliced client-side
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useBlogs({
    page: currentPage,
    limit: POSTS_PER_PAGE,
  });

  const currentPosts = React.useMemo(
    () => (data?.data.data ?? []).map(toBlogPost),
    [data]
  );

  const totalPages = data?.data.meta.totalPages ?? 0;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='py-[32px]'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: 'Home', href: '/' },
              {
                label: 'Blog',
                href: '/blog',
                isActive: true,
              },
            ]}
          />

          <div className='flex flex-col gap-2 items-center text-center'>
            <h1 className='text-ink'>LIND Journal Hub</h1>
            <span className='text-text text-xl md:text-2xl font-semibold'>
              Explore Trends, Tips, and Exclusive Property Insights
            </span>
          </div>

          {isError && (
            <StateMessage
              variant='error'
              title={states('error.journal')}
              description={states('error.description')}
            />
          )}

          {/* Blog grid */}
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {Array.from({ length: POSTS_PER_PAGE }).map((_, index) => (
                <div
                  key={index}
                  className='h-[360px] rounded bg-sand/40 animate-pulse'
                />
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Empty state if no posts */}
          {!isLoading && !isError && currentPosts.length === 0 && (
            <div className='text-center py-10'>
              <p className='text-text text-lg'>No blog posts found.</p>
            </div>
          )}

          {/* Use the reusable Pagination component */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentBlog;
