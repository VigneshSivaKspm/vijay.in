/**
 * Image helpers. Every photo has a JPEG master plus AVIF/WebP variants generated at fixed widths:
 *   /ceo/ceo-01.jpg  ->  /ceo/ceo-01-480.avif, -800.avif, -1000.avif (and .webp)
 * Producer and portrait masters are 720px wide, so their largest variant is 720.
 */
export interface PhotoMeta {
  widths: number[];
  /** Intrinsic size of the largest variant (used for width/height attributes to prevent layout shift). */
  width: number;
  height: number;
}

export const photoMeta = (src: string): PhotoMeta => {
  if (src.startsWith('/ceo/')) return { widths: [480, 800, 1000], width: 1000, height: 1094 };
  if (src.startsWith('/chairman/')) return { widths: [480, 800, 1000], width: 1000, height: 1250 };
  // /producer/* and /images/vijay/* are 720 x 900 masters
  return { widths: [480, 720], width: 720, height: 900 };
};
