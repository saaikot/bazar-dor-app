'use client';

import { useMemo } from 'react';
import { enToBn } from '@/lib/bn';

interface TickerItem {
  name: string;
  emoji: string;
  price: number;
  unit: string;
  changePercent: number;
}

const sampleItems: TickerItem[] = [
  { name: 'মিনিকেট চাল', emoji: '🍚', price: 65, unit: 'কেজি', changePercent: 2.1 },
  { name: 'সয়াবিন তেল', emoji: '🫙', price: 175, unit: 'লিটার', changePercent: -1.5 },
  { name: 'মসুর ডাল', emoji: '🫘', price: 130, unit: 'কেজি', changePercent: 0.8 },
  { name: 'পেঁয়াজ', emoji: '🧅', price: 55, unit: 'কেজি', changePercent: -3.2 },
  { name: 'আলু', emoji: '🥔', price: 45, unit: 'কেজি', changePercent: 0.0 },
  { name: 'ইলিশ মাছ', emoji: '🐟', price: 1850, unit: 'কেজি', changePercent: 4.5 },
  { name: 'ব্রয়লার মুরগি', emoji: '🍗', price: 185, unit: 'কেজি', changePercent: 1.2 },
  { name: 'ডিম', emoji: '🥚', price: 130, unit: 'ডজন', changePercent: -2.0 },
];

export default function PriceTicker() {
  const items = useMemo(() => [...sampleItems, ...sampleItems], []);

  return (
    <div className="bg-emerald-600 text-white overflow-hidden py-2">
      <div className="flex animate-marquee whitespace-nowrap gap-8">
        {items.map((item, i) => {
          const arrow =
            item.changePercent > 0 ? '▲' : item.changePercent < 0 ? '▼' : '—';
          const color =
  item.changePercent > 0
    ? 'text-emerald-200'
    : item.changePercent < 0
    ? 'text-rose-200'
    : 'text-white/70';

          return (
            <span key={i} className="flex items-center gap-2 text-sm">
              <span>{item.emoji}</span>
              <span className="font-medium">{item.name}</span>
              <span>{enToBn(item.price)} টাকা/{item.unit}</span>
              <span className={`font-semibold ${color}`}>
                {arrow} {enToBn(Math.abs(item.changePercent).toFixed(1))}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}