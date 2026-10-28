export interface RelatedBlogCategory {
  id: string;
  name: string;
}

export interface RelatedAdmin {
  id: string;
  name: string;
}

/**
 * Shape returned by GET /blogs and GET /blogs/:id (BlogPaginationDto).
 *
 * The entity has no cover-image column, so blog cards fall back to a local
 * placeholder — see `toBlogPost`.
 */
export interface Blog {
  id: string;
  title: string;
  content: string;
  /** ISO string */
  createdAt: string;
  category?: RelatedBlogCategory;
  author?: RelatedAdmin;
}

export interface BlogQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  [filter: string]: string | number | undefined;
}
