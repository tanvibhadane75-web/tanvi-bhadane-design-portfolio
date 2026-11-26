// Add, remove or replace photographs here. Images live in /public/portfolio/wall.
// Positions are percentages of the photo wall (top-left corner of each photo).

export type PhotoSize = 'large' | 'medium' | 'small' | 'wide';
export type PhotoAttachment = 'tape' | 'pin' | 'clip' | 'corners';
export type PhotoTone = 'peach' | 'sage' | 'butter' | 'rose' | 'blue' | 'lavender' | 'cream';

export type WallPhoto = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  label?: { text: string; tone: PhotoTone };
  size: PhotoSize;
  aspect: 'portrait' | 'square' | 'landscape';
  attachment: PhotoAttachment;
  accent: PhotoTone;
  torn?: boolean;
  rotation: number;
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
};

export const wallPhotos: WallPhoto[] = [
  {
    id: 'sunlit-selfie',
    src: '/portfolio/wall/sunlit-selfie.jpeg',
    alt: 'Tanvi smiling in warm sunlight, tucking her hair behind her ear',
    caption: 'A little moment worth keeping.',
    size: 'large',
    aspect: 'portrait',
    attachment: 'tape',
    accent: 'rose',
    rotation: -4,
    desktop: { x: 2, y: 4 },
    mobile: { x: 2, y: 1 },
  },
  {
    id: 'red-kurta',
    src: '/portfolio/wall/red-kurta.jpeg',
    alt: 'Tanvi in a red embroidered kurta standing in front of a stone wall',
    label: { text: 'me, mostly', tone: 'sage' },
    size: 'medium',
    aspect: 'square',
    attachment: 'pin',
    accent: 'sage',
    rotation: 5,
    desktop: { x: 21, y: 33 },
    mobile: { x: 54, y: 3 },
  },
  {
    id: 'floral-top',
    src: '/portfolio/wall/floral-top.jpeg',
    alt: 'Tanvi laughing in a floral top in a green garden',
    caption: 'Collecting memories.',
    size: 'small',
    aspect: 'square',
    attachment: 'clip',
    accent: 'butter',
    rotation: -2,
    desktop: { x: 38, y: 3 },
    mobile: { x: 58, y: 30 },
  },
  {
    id: 'magenta-kurta',
    src: '/portfolio/wall/magenta-kurta.jpeg',
    alt: 'Tanvi in a magenta kurta sitting beside an old stone pillar',
    caption: 'Somewhere in my happy place.',
    size: 'medium',
    aspect: 'square',
    attachment: 'corners',
    accent: 'lavender',
    torn: true,
    rotation: -5,
    desktop: { x: 52, y: 36 },
    mobile: { x: 3, y: 36 },
  },
  {
    id: 'pink-saree',
    src: '/portfolio/wall/pink-saree.jpeg',
    alt: 'Tanvi in a pink saree standing in front of a green hedge and palm trees',
    caption: 'Little pieces of my story.',
    size: 'large',
    aspect: 'portrait',
    attachment: 'tape',
    accent: 'blue',
    rotation: 3,
    desktop: { x: 67, y: 2 },
    mobile: { x: 50, y: 52 },
  },
  {
    id: 'maroon-saree',
    src: '/portfolio/wall/maroon-saree.jpeg',
    alt: 'Tanvi in a maroon silk saree with an orange border beside a decorative wall',
    label: { text: 'a good day', tone: 'peach' },
    size: 'medium',
    aspect: 'portrait',
    attachment: 'pin',
    accent: 'rose',
    torn: true,
    rotation: -3,
    desktop: { x: 84, y: 40 },
    mobile: { x: 5, y: 62 },
  },
  {
    id: 'cafe-moment',
    src: '/portfolio/wall/cafe-moment.jpeg',
    alt: 'Tanvi resting her chin on her hands with her eyes closed, smiling',
    caption: 'Just being here.',
    size: 'wide',
    aspect: 'landscape',
    attachment: 'tape',
    accent: 'butter',
    rotation: 2,
    desktop: { x: 30, y: 66 },
    mobile: { x: 22, y: 83 },
  },
];
