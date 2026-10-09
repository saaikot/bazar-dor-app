'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const categories = [
  { name: 'চাল', slug: 'chal', icon: '🍚' },
  { name: 'ডাল', slug: 'dal', icon: '🫘' },
  { name: 'তেল', slug: 'tel', icon: '🛢️' },
  { name: 'সবজি', slug: 'sobji', icon: '🥬' },
  { name: 'মাছ', slug: 'mach', icon: '🐟' },
  { name: 'মাংস', slug: 'mangsho', icon: '🍗' },
  { name: 'ডিম-দুধ', slug: 'dim-dui', icon: '🥛' },
  { name: 'মসলা', slug: 'mosla', icon: '🌶️' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [banglaDate, setBanglaDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const bnDays = [
      'রবিবার',
      'সোমবার',
      'মঙ্গলবার',
      'বুধবার',
      'বৃহস্পতিবার',
      'শুক্রবার',
      'শনিবার',
    ];
    const bnMonths = [
      'জানুয়ারি',
      'ফেব্রুয়ারি',
      'মার্চ',
      'এপ্রিল',
      'মে',
      'জুন',
      'জুলাই',
      'আগস্ট',
      'সেপ্টেম্বর',
      'অক্টোবর',
      'নভেম্বর',
      'ডিসেম্বর',
    ];

    const day = bnDays[today.getDay()];
    const date = today.getDate();
    const month = bnMonths[today.getMonth()];
    const year = today.getFullYear();

    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const toBn = (n: number) =>
      n
        .toString()
        .split('')
        .map((d) => bnDigits[parseInt(d)])
        .join('');

    setBanglaDate(`${day}, ${toBn(date)} ${month}, ${toBn(year)}`);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    toast.success('সফলভাবে লগআউট হয়েছে');
    window.location.href = '/';
  };

  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="বাজার দর"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">বাজার দর</span>
            <span className="text-xs text-base-content/60">{banglaDate}</span>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : session?.user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-sm btn-ghost gap-2"
              >
                <div className="avatar placeholder">
                  <div className="bg-emerald-600 text-white rounded-full w-7">
                    <span className="text-xs">
                      {session.user.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline">
                  {session.user.name ?? 'ব্যবহারকারী'}
                </span>
                <span className="text-xs">▾</span>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg border border-base-300"
              >
                <li>
                  <Link href="/profile">প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>সাইন আউট</button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost">
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm bg-emerald-600 hover:bg-emerald-700 text-white border-0"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-base-300 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto">
          <ul className="flex items-center gap-1 py-2 whitespace-nowrap">
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`btn btn-sm btn-ghost ${
                      active
                        ? 'btn-active bg-emerald-600 hover:bg-emerald-700 text-white'
                        : ''
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}