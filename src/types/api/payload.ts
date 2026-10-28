/**
 * Response envelope used by the Lind Society backend (JSend-style).
 *
 * Every endpoint wraps its result as `{ status, message, code, data }`.
 * Paginated endpoints put `{ data, meta, links }` inside that `data` field,
 * so a paginated list is typed as `Payload<Data<Villa[]>>`.
 *
 * Note: the older `TMetaResponse` in ../index.d.ts does NOT match the real
 * backend (it expects a `pagination` key that the API never sends). Prefer
 * the types below for anything talking to the API.
 */

export interface PaginateResponseMetaProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: unknown;
  searchBy: unknown;
  search: string;
  select: string[];
  filter?: {
    [column: string]: string | string[];
  };
}

export interface PaginateResponseLinksProps {
  first?: string | null;
  previous?: string | null;
  current: string;
  next?: string | null;
  last?: string | null;
}

/** Body of a paginated endpoint — sits inside `Payload.data`. */
export interface Data<T> {
  links: PaginateResponseLinksProps;
  meta: PaginateResponseMetaProps;
  data: T;
}

export interface Payload<T> {
  data: T;
  message: string;
  code: number;
  status: 'success' | 'fail' | 'error';
}
