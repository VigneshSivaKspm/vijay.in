import React from 'react';

interface PictureProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'sizes' | 'alt'> {
  /** The JPEG master, e.g. "/ceo/ceo-01.jpg". AVIF and WebP variants are derived from the name. */
  src: string;
  alt: string;
  widths: number[];
  /** Standard `sizes` attribute describing the rendered width, so the browser downloads the smallest adequate file. */
  sizes: string;
}

/** Serves AVIF, then WebP, then the JPEG master. Always pass width/height to reserve space (no layout shift). */
const Picture: React.FC<PictureProps> = ({ src, alt, widths, sizes, ...img }) => {
  const base = src.replace(/\.(jpe?g|png)$/i, '');
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img src={src} alt={alt} decoding="async" {...img} />
    </picture>
  );
};

export default Picture;
