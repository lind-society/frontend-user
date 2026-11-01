import * as React from 'react';

import { siteConfig } from '@/constant/config';

type PageMetaProps = {
  /** Rendered as `<title> | Lind`; omitted means the bare site title. */
  title?: string;
  robots?: string;
  referrer?: React.MetaHTMLAttributes<HTMLMetaElement>['content'];
};

/** Per-page document title plus the few meta tags a page may override. */
export default function PageMeta({ title, robots, referrer }: PageMetaProps) {
  React.useEffect(() => {
    document.title = title
      ? `${title} | ${siteConfig.title}`
      : siteConfig.title;
  }, [title]);

  return (
    <>
      {robots && <meta name='robots' content={robots} />}
      {referrer && <meta name='referrer' content={referrer} />}
    </>
  );
}
