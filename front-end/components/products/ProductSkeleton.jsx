export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-xs animate-pulse dark:border-zinc-800 dark:bg-zinc-900">
      <div className="aspect-square w-full rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="mt-3 h-5 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-2 h-4 w-full rounded-md bg-zinc-100 dark:bg-zinc-800/60" />
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="h-6 w-20 rounded-md bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-24 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default function ProductSkeleton({ count = 8 }) {
  return <ProductGridSkeleton count={count} />;
}
