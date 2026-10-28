import { BlogPost } from '@/components/ui/card/blog';

import { toSlug } from './format';

import { Blog as ApiBlog } from '@/types/api/blog';

/**
 * Cover image shown when a post has none.
 *
 * The `blogs` table has no image/cover column at all, so every post falls back
 * to this asset. Giving blogs a real cover needs a backend column + migration.
 */
const FALLBACK_COVER = '/images/discover-1.png';

/** Strip markup and clamp `content` down to a card-sized excerpt. */
const toExcerpt = (content: string, maxLength = 160): string => {
  const plain = content
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= maxLength) return plain;
  return `${plain.slice(0, maxLength).trimEnd()}…`;
};

const formatDate = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

/** Map a post from GET /blogs onto the card view model. */
export const toBlogPost = (blog: ApiBlog): BlogPost => ({
  id: blog.id,
  title: blog.title,
  date: formatDate(blog.createdAt),
  excerpt: toExcerpt(blog.content),
  image: FALLBACK_COVER,
  slug: toSlug(blog.title),
});
