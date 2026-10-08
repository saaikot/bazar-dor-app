'use client';

import { useRouter } from 'next/navigation';

interface Props {
  currentSort: string;
  slug: string;
}

export default function CategorySort({ currentSort, slug }: Props) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'default') {
      router.push(`/category/${slug}`);
    } else {
      router.push(`/category/${slug}?sort=${val}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-base-content/70">সাজান:</span>
      <select
        className="select select-bordered select-sm w-52"
        value={currentSort}
        onChange={handleChange}
      >
        <option value="default">ডিফল্ট</option>
        <option value="low-high">দাম: কম থেকে বেশি</option>
        <option value="high-low">দাম: বেশি থেকে কম</option>
      </select>
    </div>
  );
}