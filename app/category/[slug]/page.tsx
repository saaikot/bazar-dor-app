export const instant = false;

import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import CategorySort from '@/components/CategorySort';
import Link from 'next/link';
import { Product } from '@/types';


interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

const categoryNames: Record<string, { name: string; icon: string }> = {
  chal: { name: 'চাল', icon: '🍚' },
  dal: { name: 'ডাল', icon: '🫘' },
  tel: { name: 'তেল', icon: '🫙' },
  sobji: { name: 'সবজি', icon: '🥔' },
  mach: { name: 'মাছ', icon: '🐟' },
  mangsho: { name: 'মাংস', icon: '🍗' },
  'dim-dui': { name: 'ডিম-দুধ', icon: '🥛' },
  mosla: { name: 'মসলা', icon: '🌶️' },
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const catInfo = categoryNames[slug];
  if (!catInfo) {
    notFound();
  }

  let products: Product[] = [];
  try {
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error(error);
  }

  const sorted = [...products];
  if (sort === 'low-high') {
    sorted.sort((a, b) => a.today - b.today);
  } else if (sort === 'high-low') {
    sorted.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{catInfo.icon}</span>
        <h1 className="text-3xl font-bold">{catInfo.name}</h1>
        <span className="badge badge-ghost">{products.length} টি পণ্য</span>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <h2 className="text-2xl font-bold mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
          <p className="text-base-content/60 mb-6">
            এই ক্যাটাগরিতে কোনো পণ্য নেই।
          </p>
          <Link href="/" className="btn btn-primary">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <CategorySort currentSort={sort || 'default'} slug={slug} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}