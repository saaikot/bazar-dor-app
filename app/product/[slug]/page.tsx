import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProducts } from '@/lib/api';
import { enToBn } from '@/lib/bn';

export const instant = false;

interface Props {
  params: Promise<{ slug: string }>;
}

const unitMap: Record<string, string> = {
  kg: 'প্রতি কেজি',
  litre: 'প্রতি লিটার',
  dozen: 'প্রতি ডজন',
  piece: 'প্রতি পিস',
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product = null;
  try {
    const all = await getAllProducts();
    product = all.find((p) => p.slug === slug);
  } catch (error) {
    console.error(error);
  }

  if (!product) {
    notFound();
  }

  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
  const avgPrice = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  const unitText = unitMap[product.unit] || `প্রতি ${product.unit}`;
  const change = product.change?.pct ?? 0;
  const dir = product.change?.dir ?? 'flat';
  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  const badgeClass =
    dir === 'up' ? 'badge-success' : dir === 'down' ? 'badge-error' : 'badge-ghost';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`}>
              {product.categoryNameBn}
            </Link>
          </li>
          <li>{product.nameBn}</li>
        </ul>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm mb-6">
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="text-center">
              <div className="text-7xl mb-2">{product.image}</div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-primary">
                  {product.categoryIcon} {product.categoryNameBn}
                </span>
                <span className="badge badge-ghost">{unitText}</span>
              </div>

              <h1 className="text-3xl font-bold mb-2">{product.nameBn}</h1>

              <p className="text-base-content/60 mb-4">
                বাজারের সবচেয়ে সঠিক ও সর্বশেষ দামের তথ্য
              </p>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-xs text-base-content/60">আজকের দাম</p>
                  <p className="text-3xl font-bold">
                    {enToBn(product.today)} টাকা
                  </p>
                </div>
                <span className={`badge ${badgeClass} badge-lg`}>
                  {arrow} {enToBn(Math.abs(change).toFixed(1))}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 border border-base-300 rounded-box">
          <div className="stat-title">সর্বনিম্ন দাম</div>
          <div className="stat-value text-success text-2xl">
            {enToBn(minPrice)} টাকা
          </div>
        </div>
        <div className="stat bg-base-100 border border-base-300 rounded-box">
          <div className="stat-title">সর্বোচ্চ দাম</div>
          <div className="stat-value text-error text-2xl">
            {enToBn(maxPrice)} টাকা
          </div>
        </div>
        <div className="stat bg-base-100 border border-base-300 rounded-box">
          <div className="stat-title">গড় দাম</div>
          <div className="stat-value text-primary text-2xl">
            {enToBn(avgPrice)} টাকা
          </div>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <h2 className="card-title mb-4">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th>সর্বনিম্ন</th>
                  <th>সর্বোচ্চ</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={i}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td>{enToBn(m.min)} টাকা</td>
                    <td>{enToBn(m.max)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}