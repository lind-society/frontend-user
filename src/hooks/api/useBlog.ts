import { useGetApi } from './useApi';

import { Blog, BlogQuery } from '@/types/api/blog';
import { Data, Payload } from '@/types/api/payload';

/** GET /blogs — paginated list. Public endpoint. */
export const useBlogs = (query: BlogQuery = {}) =>
  useGetApi<Payload<Data<Blog[]>>>({
    key: ['blogs', query],
    url: 'blogs',
    params: query,
  });

/** GET /blogs/:id — single post. */
export const useBlog = (id?: string) =>
  useGetApi<Payload<Blog>>({
    key: ['blog', id],
    url: `blogs/${id}`,
    enabled: Boolean(id),
  });
