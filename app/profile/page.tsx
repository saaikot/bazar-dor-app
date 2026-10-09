'use client';

import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/signin?redirect=/profile');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const initial = session.user.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        আমার প্রোফাইল
      </h1>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-6">
            <div className="avatar placeholder">
              <div className="bg-emerald-600 text-white rounded-full w-16">
                <span className="text-2xl">{initial}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {session.user.name || 'ব্যবহারকারী'}
              </h2>
              <p className="text-sm text-base-content/60">
                {session.user.email}
              </p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-0 w-full sm:w-auto"
          >
            তথ্য আপডেট করুন
          </Link>
        </div>
      </div>
    </div>
  );
}