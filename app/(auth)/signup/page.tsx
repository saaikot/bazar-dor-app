'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { signUp } from '@/lib/auth-client';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    if (error) {
      toast.error(error.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      setLoading(false);
      return;
    }
    toast.success('সফলভাবে রেজিস্ট্রেশন হয়েছে!');
    router.push('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-6">সাইন আপ করুন</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label"><span className="label-text">নাম</span></label>
              <input type="text" 
              placeholder="Enter your name"
              className="input input-bordered w-full"
                value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="label"><span className="label-text">ইমেইল</span></label>
              <input type="email" 
              placeholder="Your email"
              className="input input-bordered w-full"
                value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label"><span className="label-text">পাসওয়ার্ড</span></label>
              <input type="password" 
              placeholder="Enter your password"
              className="input input-bordered w-full"
                value={password} onChange={(e) => setPassword(e.target.value)}
                required minLength={8} />
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? 'রেজিস্টার হচ্ছে...' : 'রেজিস্টার'}
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            অ্যাকাউন্ট আছে?{' '}
            <Link href="/signin" className="link link-primary">সাইন ইন করুন</Link>
          </p>
        </div>
      </div>
    </div>
  );
}