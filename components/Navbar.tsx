'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSession, signOut } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const categories = [
  { name: 'চাল', slug: 'chal', icon: '🍚' },
  { name: 'ডাল', slug: 'dal', icon: '🫘' },
  { name: 'তেল', slug: 'tel', icon: '🫙' },
  { name: 'সবজি', slug: 'sobji', icon: '🥔' },
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
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const enDate = today.toLocaleDateString('en-GB', options);
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    const bnDate = enDate.replace(/\d/g, (d) => bnDigits[parseInt(d)]);
    setBanglaDate(bnDate);
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
            <>
              <Link
                href="/profile"
                className="btn btn-sm btn-ghost hidden sm:inline-flex"
              >
                {session.user.name}
              </Link>
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-outline"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm btn-ghost">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm btn-primary">
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
                      active ? 'btn-active bg-primary text-primary-content' : ''
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