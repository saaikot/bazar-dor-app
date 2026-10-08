import { Product, Category } from '@/types';

const BASE_URL_1 = 'https://api.api-store.workers.dev/api/bazardor';
const BASE_URL_2 = 'https://api.abcz.workers.dev/api/bazardor';
async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  const urls = [`${BASE_URL_1}${endpoint}`, `${BASE_URL_2}${endpoint}`];

  for (const url of urls) {
    try {
      const res = await fetch(url, { next: { revalidate: 300 } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      continue;
    }
  }
  throw new Error(`API failed: ${endpoint}`);
}

export async function getAllProducts(): Promise<Product[]> {
  return fetchWithFallback<Product[]>('/products');
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  return fetchWithFallback<Product[]>(`/products?category=${categorySlug}`);
}

export async function getSingleProduct(
  slug: string
): Promise<Product | null> {
  try {
    return await fetchWithFallback<Product>(`/products/${slug}`);
  } catch {
    return null;
  }
}

export async function getAllCategories(): Promise<Category[]> {
  return fetchWithFallback<Category[]>('/categories');
}

export async function getSingleCategory(
  slug: string
): Promise<Category | null> {
  try {
    return await fetchWithFallback<Category>(`/categories/${slug}`);
  } catch {
    return null;
  }
}