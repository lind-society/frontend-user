import React from 'react';
import { useTranslations } from 'use-intl';

import { useParams } from '@/lib/navigation';
import { useBlog } from '@/hooks/api/useBlog';

import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import PageMeta from '@/components/page-meta';
import Skeleton from '@/components/Skeleton';
import { Button } from '@/components/ui/button';
import { StateMessage } from '@/components/ui/state-message';

import ContentBlogDetail from '@/modules/blog-detail/content';

const BlogDetailModules = () => {
  const t = useTranslations('blogDetail');
  const { name: id } = useParams();
  const { data, isLoading, isError, error } = useBlog(id);

  if (isLoading) {
    return (
      <div className='py-16 pt-[96px]' aria-busy='true'>
        <BaseContainer>
          <div className='mx-auto flex max-w-[1000px] flex-col gap-6'>
            <Skeleton className='h-10 w-3/4 rounded' />
            <Skeleton className='h-5 w-1/3 rounded' />
            <Skeleton className='h-[360px] w-full rounded' />
            <Skeleton className='h-40 w-full rounded' />
          </div>
        </BaseContainer>
      </div>
    );
  }

  const post = data?.data;

  if (isError || !post) {
    const status = (error as { response?: { status?: number } } | null)
      ?.response?.status;
    const notFound = !isError || status === 404 || status === 400;

    return (
      <div className='pb-16 pt-[96px]'>
        <BaseContainer>
          <StateMessage
            variant={notFound ? 'empty' : 'error'}
            title={notFound ? t('notFoundTitle') : t('errorTitle')}
            description={
              notFound ? t('notFoundDescription') : t('errorDescription')
            }
            action={
              <Button variant='primary' asChild>
                <Link href='/blog'>{t('backToBlog')}</Link>
              </Button>
            }
          />
        </BaseContainer>
      </div>
    );
  }

  return (
    <div>
      <PageMeta title={post.title} />
      <ContentBlogDetail post={post} />
    </div>
  );
};

export default BlogDetailModules;
