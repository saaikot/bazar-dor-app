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
    dir === 'up'
      ? 'bg-emerald-100 text-emerald-700'
      : dir === 'down'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-base-200 text-base-content/60';

  return (
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border border-base-300 hover:border-primary hover:shadow-md transition-all"
    >
      <div className="card-body p-4 gap-3">
        {/* Top row: emoji + name */}
        <div className="flex items-start gap-3">
          <div className="text-3xl shrink-0">{product.image}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base leading-tight">
              {product.nameBn}
            </h3>
            <p className="text-xs text-base-content/60 mt-0.5">{unitText}</p>
          </div>
        </div>

        {/* Bottom row: price + badge */}
        <div className="flex items-end justify-between gap-2 pt-2 border-t border-base-200">
          <div>
            <p className="text-[10px] text-base-content/60">আজকের দাম</p>
            <p className="text-xl font-bold">
              {enToBn(product.today)}{' '}
              <span className="text-sm font-normal">টাকা</span>
            </p>
          </div>
          <span
            className={`badge badge-sm border-0 font-semibold ${badgeClass}`}
          >
            {arrow} {enToBn(Math.abs(change).toFixed(1))}%
          </span>
        </div>
      </div>
    </Link>
  );
}