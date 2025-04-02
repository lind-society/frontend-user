'use client';

import React, { useState } from 'react';

import BaseContainer from '@/components/layouts/container';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { BlogCard } from '@/components/ui/card/blog';
import Pagination from '@/components/ui/pagination';

import { blogPosts2 } from '@/modules/landing-page/constant';

const ContentBlog = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(blogPosts2.length / postsPerPage);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts2.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optionally scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='py-[32px] ] bg-bg'>
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
            <h4 className='text-primary'>LIND Journal Hub</h4>
            <span className='text-text text-xl md:text-2xl font-semibold'>
              Explore Trends, Tips, and Exclusive Property Insights
            </span>
          </div>

          {/* Blog grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Empty state if no posts */}
          {currentPosts.length === 0 && (
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
