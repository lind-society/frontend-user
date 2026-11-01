import * as React from 'react';

type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'width' | 'height' | 'loading'
> & {
  src: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  /** Stretch to cover the nearest positioned ancestor. */
  fill?: boolean;
  /** Above-the-fold image: load eagerly with high fetch priority. */
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  /** Accepted for call-site compatibility; images are served as stored. */
  quality?: number;
};

/**
 * Plain `<img>` with the handful of conveniences the pages rely on: `fill`
 * for cover images inside a positioned wrapper, `priority` for hero images,
 * and lazy loading for everything else.
 */
const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  // eslint-disable-next-line unused-imports/no-unused-vars
  { fill, priority, loading, style, width, height, decoding, quality, ...rest },
  ref
) {
  return (
    <img
      ref={ref}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={loading ?? (priority ? 'eager' : 'lazy')}
      fetchPriority={priority ? 'high' : undefined}
      decoding={decoding ?? 'async'}
      style={
        fill
          ? {
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              ...style,
            }
          : style
      }
      {...rest}
    />
  );
});

export default Image;
