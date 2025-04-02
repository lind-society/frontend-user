import { Metadata } from 'next';
import React from 'react';

import BlogModules from '@/modules/blog';

export const metadata: Metadata = {
  title: 'Blog',
};

const BlogPage = async () => {
  return <BlogModules />;
};

export default BlogPage;
