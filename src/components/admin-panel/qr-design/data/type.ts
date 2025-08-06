export interface Design {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | File; // updated to allow File type here
  status: 'available' | 'comingSoon' | 'unavailable';
  category?: string;
  price?: number;
}