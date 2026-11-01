import DOMPurify from 'dompurify';
import React from 'react';
import {
  FaCalendarAlt,
  FaFacebook,
  FaShare,
  FaTag,
  FaTwitter,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { toast } from 'sonner';
import { useTranslations } from 'use-intl';

import { toBlogPost } from '@/lib/mappers/blog';
import { useBlogs } from '@/hooks/api/useBlog';

import Image from '@/components/image';
import BaseContainer from '@/components/layouts/container';
import Link from '@/components/link';
import BreadcrumbLayout from '@/components/ui/breadcrumb-layout';
import { Button } from '@/components/ui/button';
import { BlogCard } from '@/components/ui/card/blog';

import { Blog } from '@/types/api/blog';

const formatDate = (iso?: string) => {
  const date = iso ? new Date(iso) : null;

  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';
};

const SHARE_LINK =
  'flex items-center justify-center rounded bg-primary w-10 h-10 text-cream hover:bg-primary/90 transition-colors';

const ContentBlogDetail = ({ post }: { post: Blog }) => {
  const t = useTranslations('blogDetail');

  // Posts are written in the admin as HTML, so it is sanitised before it is
  // injected: a compromised or careless editor must not be able to run script.
  const html = React.useMemo(
    () => DOMPurify.sanitize(post.content ?? ''),
    [post.content]
  );

  const { data: related } = useBlogs({ page: 1, limit: 4 });
  const relatedPosts = (related?.data.data ?? [])
    .filter((other) => other.id !== post.id)
    .slice(0, 3)
    .map(toBlogPost);

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success(t('linkCopied'));
      }
    } catch {
      // The visitor dismissed the share sheet: nothing to report.
    }
  };

  return (
    <div className='py-8 md:py-12 lg:py-16 bg-bg'>
      <BaseContainer>
        <div className='flex flex-col gap-8'>
          <BreadcrumbLayout
            items={[
              { label: t('home'), href: '/' },
              { label: t('blog'), href: '/blog' },
              { label: post.title, href: `/blog/${post.id}`, isActive: true },
            ]}
          />

          <article className='flex flex-col gap-8 max-w-[1000px] mx-auto w-full'>
            <header className='flex flex-col gap-4'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary'>
                {post.title}
              </h1>

              <div className='flex flex-wrap gap-4 text-sm text-text/70'>
                <div className='flex items-center gap-1'>
                  <FaCalendarAlt className='text-primary' />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                {post.author?.name && (
                  <div className='flex items-center gap-1'>
                    <FaUser className='text-primary' />
                    <span>
                      {t('by')} {post.author.name}
                    </span>
                  </div>
                )}
                {post.category?.name && (
                  <div className='flex items-center gap-1'>
                    <FaTag className='text-primary' />
                    <span>{post.category.name}</span>
                  </div>
                )}
              </div>
            </header>

            <div className='flex justify-between items-center w-full border-y border-bronze/25 py-4'>
              <div className='flex gap-2 items-center'>
                <a
                  href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                  target='_blank'
                  rel='noreferrer'
                  className={SHARE_LINK}
                  aria-label={`${t('shareOn')} WhatsApp`}
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                  target='_blank'
                  rel='noreferrer'
                  className={SHARE_LINK}
                  aria-label={`${t('shareOn')} Twitter`}
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target='_blank'
                  rel='noreferrer'
                  className={SHARE_LINK}
                  aria-label={`${t('shareOn')} Facebook`}
                >
                  <FaFacebook size={20} />
                </a>
              </div>
              <Button
                variant='primary-outline'
                className='flex items-center gap-2'
                onClick={handleShare}
              >
                <span>{t('share')}</span>
                <FaShare size={16} />
              </Button>
            </div>

            {/* The API has no cover image for posts, so a branded one is used. */}
            <figure className='my-2'>
              <div className='rounded overflow-hidden'>
                <Image
                  src='/images/blog-2.jpeg'
                  width={1000}
                  height={600}
                  sizes='(max-width: 1000px) 100vw, 1000px'
                  className='w-full max-h-[420px] object-cover'
                  alt={post.title}
                  priority
                />
              </div>
            </figure>

            <div
              className='prose prose-lg max-w-none text-left prose-headings:font-heading prose-headings:text-primary prose-a:text-primary prose-img:rounded'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {relatedPosts.length > 0 && (
            <section className='mt-8 pt-8 border-t border-bronze/25'>
              <div className='flex flex-col gap-8'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                  <h2 className='text-xl md:text-2xl font-semibold text-primary'>
                    {t('related')}
                  </h2>
                  <Button variant='primary-outline' asChild>
                    <Link href='/blog' className='flex gap-2 items-center'>
                      <span>{t('viewAll')}</span>
                      <RiArrowRightUpLine size={20} />
                    </Link>
                  </Button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                  {relatedPosts.map((related) => (
                    <BlogCard key={related.id} post={related} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </BaseContainer>
    </div>
  );
};

export default ContentBlogDetail;
