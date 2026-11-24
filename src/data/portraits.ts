/** Portrait slideshow shown in the bio section on the home page. Masters live in public/images/vijay/ (AVIF/WebP variants alongside). */
export interface Portrait {
  /** JPEG master. AVIF/WebP variants are derived from this name by <Picture>. */
  src: string;
  alt: string;
}

const COUNT = 20;

export const portraits: Portrait[] = Array.from({ length: COUNT }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/images/vijay/vijay-${num}.jpg`,
    alt: `S Vijay Krishnan, portrait ${i + 1} of ${COUNT}`,
  };
});
