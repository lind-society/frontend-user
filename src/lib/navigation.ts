import { useMemo } from 'react';
import {
  useLocation,
  useNavigate,
  useSearchParams as useRouterSearchParams,
} from 'react-router';

/** Imperative navigation: `push`, `replace`, `back`, `forward`. */
export function useRouter() {
  const navigate = useNavigate();

  return useMemo(
    () => ({
      push: (href: string) => navigate(href),
      replace: (href: string) => navigate(href, { replace: true }),
      back: () => navigate(-1),
      forward: () => navigate(1),
    }),
    [navigate]
  );
}

export function usePathname() {
  return useLocation().pathname;
}

/** Read-only view of the current query string. */
export function useSearchParams() {
  return useRouterSearchParams()[0];
}

export { useParams } from 'react-router';
