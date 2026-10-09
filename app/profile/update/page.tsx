'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('নাম খালি রাখা যাবে না');
      return;
    }

    setLoading(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    if (error) {
      toast.error(error.message || 'আপডেট ব্যর্থ হয়েছে');
      setLoading(false);
      return;
    }

    toast.success('তথ্য সফলভাবে আপডেট হয়েছে!');
    setLoading(false);
    router.push('/profile');
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 flex justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/profile" className="link link-hover text-sm">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">
        তথ্য আপডেট করুন
      </h1>

      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">নাম</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">ইমেইল</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={session?.user?.email || ''}
                disabled
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  ইমেইল পরিবর্তন করা যাবে না
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-0 w-full"
              disabled={loading}
            >
              {loading ? 'আপডেট হচ্ছে...' : 'তথ্য আপডেট করুন'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}