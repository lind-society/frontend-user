import * as React from 'react';
import { Link as RouterLink } from 'react-router';

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  replace?: boolean;
};

const isExternal = (href: string) =>
  /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('//');

/**
 * Anchor that routes client-side for in-app paths and falls back to a plain
 * `<a>` for external URLs, `mailto:`/`tel:` and in-page `#hash` links.
 */
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, replace, ...rest },
  ref
) {
  if (isExternal(href) || href.startsWith('#')) {
    return <a ref={ref} href={href} {...rest} />;
  }

  return <RouterLink ref={ref} to={href} replace={replace} {...rest} />;
});

export default Link;
