export interface Product {
  id: number;
  name: string;
  slug: string;
  emoji: string;
  category: string;
  categoryName: string;
  unit: string;
  currentPrice: number;
  changePercent: number;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  markets?: { name: string; price: number }[];
  description?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  count?: number;
}