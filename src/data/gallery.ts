/** Real photographs only. Files live in public/producer, public/chairman and public/ceo. */
export interface GalleryItem {
  id: string;
  src: string;
  category: 'producer' | 'chairman' | 'ceo';
  caption: string;
  aspectRatio: 'square' | 'portrait' | 'landscape' | 'wide';
}

const NAME = 'S Vijay Krishnan';

export const gallery: GalleryItem[] = [
  { id: 'ceo-1', src: '/ceo/ceo-01.jpg', category: 'ceo', caption: `${NAME} by a boardroom window`, aspectRatio: 'portrait' },
  { id: 'ceo-2', src: '/ceo/ceo-02.jpg', category: 'ceo', caption: `${NAME} in a maroon suit`, aspectRatio: 'portrait' },
  { id: 'ceo-3', src: '/ceo/ceo-03.jpg', category: 'ceo', caption: `${NAME} in a navy suit`, aspectRatio: 'portrait' },
  { id: 'ceo-4', src: '/ceo/ceo-04.jpg', category: 'ceo', caption: `${NAME} at a conference panel`, aspectRatio: 'portrait' },
  { id: 'chairman-1', src: '/chairman/chairman-01.jpg', category: 'chairman', caption: `${NAME} at sunset in his office`, aspectRatio: 'portrait' },
  { id: 'chairman-2', src: '/chairman/chairman-02.jpg', category: 'chairman', caption: `${NAME} at the boardroom table`, aspectRatio: 'portrait' },
  { id: 'chairman-3', src: '/chairman/chairman-03.jpg', category: 'chairman', caption: `${NAME} walking through a lobby`, aspectRatio: 'portrait' },
  { id: 'chairman-4', src: '/chairman/chairman-04.jpg', category: 'chairman', caption: `${NAME} in a leather armchair`, aspectRatio: 'portrait' },
  { id: 'producer-1', src: '/producer/producer-01.jpg', category: 'producer', caption: `${NAME} beside a cinema camera`, aspectRatio: 'portrait' },
  { id: 'producer-2', src: '/producer/producer-02.jpg', category: 'producer', caption: `${NAME} in a director's chair`, aspectRatio: 'portrait' },
  { id: 'producer-3', src: '/producer/producer-03.jpg', category: 'producer', caption: `${NAME} on a film set`, aspectRatio: 'portrait' },
  { id: 'producer-4', src: '/producer/producer-04.jpg', category: 'producer', caption: `${NAME}, studio portrait`, aspectRatio: 'portrait' },
];
