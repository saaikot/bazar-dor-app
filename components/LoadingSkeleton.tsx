export default function LoadingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="card bg-base-100 border border-base-300 shadow-sm"
        >
          <div className="card-body p-4">
            <div className="skeleton h-16 w-16 rounded-full" />
            <div className="skeleton h-4 w-3/4 mt-3" />
            <div className="skeleton h-3 w-1/2 mt-2" />
            <div className="flex justify-between items-center mt-4">
              <div className="skeleton h-6 w-20" />
              <div className="skeleton h-5 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}