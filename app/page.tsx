import Link from 'next/link';
import { getAllProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('API error:', error);
  }

  const risers = [...products]
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-2xl p-6 md:p-10 mb-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold text-emerald-700 mb-3">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <Link
              href="#সব-পণ্য"
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-0"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/hero-banner.png"
              alt="বাজার দর"
              className="w-full max-w-sm object-contain"
            />
          </div>
        </div>
      </section>

      {/* Risers */}
      {risers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-emerald-600">▲</span>
            <span>আজ দাম বেড়েছে</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Fallers */}
      {fallers.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="text-rose-500">▼</span>
            <span>আজ দাম কমেছে</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* সব পণ্য */}
      <section id="সব-পণ্য">
        <h2 className="text-xl font-bold mb-1">সব পণ্য</h2>
        <p className="text-sm text-base-content/60 mb-5">
          মোট {products.length} টি পণ্য দেখানো হচ্ছে
        </p>

        {products.length === 0 ? (
          <p className="text-center py-10 text-base-content/60">
            ডেটা লোড হচ্ছে বা পাওয়া যায়নি...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}