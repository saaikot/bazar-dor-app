'use client';

import Link from 'next/link';
import { enToBn } from '@/lib/bn';
import { Product } from '@/types';

interface Props {
  product: Product;
}

const unitMap: Record<string, string> = {
  kg: 'প্রতি কেজি',
  litre: 'প্রতি লিটার',
  dozen: 'প্রতি ডজন',
  piece: 'প্রতি পিস',
};

export default function ProductCard({ product }: Props) {
  const unitText = unitMap[product.unit] || `প্রতি ${product.unit}`;
  const change = product.change?.pct ?? 0;
  const dir = product.change?.dir ?? 'flat';

  const arrow = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  const badgeClass =
    dir === 'up' ? 'badge-success' : dir === 'down' ? 'badge-error' : 'badge-ghost';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="card-body p-4">
        <div className="text-5xl text-center py-3">{product.image}</div>

        <h3 className="card-title text-base justify-center text-center">
          {product.nameBn}
        </h3>

        <p className="text-xs text-center text-base-content/60">{unitText}</p>

        <div className="flex items-center justify-between mt-2 gap-2">
          <div>
            <p className="text-[10px] text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold">{enToBn(product.today)} টাকা</p>
          </div>
          <span className={`badge ${badgeClass} badge-sm`}>
            {arrow} {enToBn(Math.abs(change).toFixed(1))}%
          </span>
        </div>
      </div>
    </Link>
  );
}