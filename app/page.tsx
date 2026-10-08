import Link from 'next/link';
import { getAllProducts } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  let products: any[] = [];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('API error:', error);
  }

  // Top risers 
  const risers = [...products]
    .filter((p) => (p.changePercent ?? p.change ?? 0) > 0)
    .sort(
      (a, b) =>
        (b.changePercent ?? b.change ?? 0) - (a.changePercent ?? a.change ?? 0)
    )
    .slice(0, 6);

  // Top fallers 
  const fallers = [...products]
    .filter((p) => (p.changePercent ?? p.change ?? 0) < 0)
    .sort(
      (a, b) =>
        (a.changePercent ?? a.change ?? 0) - (b.changePercent ?? b.change ?? 0)
    )
    .slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm font-semibold text-primary mb-2">
              প্রয়োজন, মূল্য, সঠিক তথ্য
            </p>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              আজকের বাজারে দাম এক নজরে
            </h1>
            <p className="text-base-content/70 mb-6">
              চাল, ডাল, তেল, সবজি, মাছ — প্রতিদিনের প্রয়োজনীয় পণ্যের আজকের
              দাম, বাড়া-কমার তথ্য এবং বাজারভিত্তিক তুলনা এক জায়গায়।
            </p>
            <Link href="#সব-পণ্য" className="btn btn-primary">
              সব পণ্য দেখুন
            </Link>
          </div>
          <div className="flex justify-center">
            <img
              src="/hero-banner.png"
              alt="বাজার দর"
              className="w-full max-w-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* Risers */}
      {risers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-success">
            আজ দাম বেড়েছে ▲
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Fallers */}
      {fallers.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4 text-error">
            আজ দাম কমেছে ▼
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* সব পণ্য */}
      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-2">সব পণ্য</h2>
        <p className="text-base-content/60 mb-6">
          বাজারের সব পণ্যের আজকের দাম
        </p>

        {products.length === 0 ? (
          <p className="text-center py-10 text-base-content/60">
            ডেটা লোড হচ্ছে বা পাওয়া যায়নি...
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}