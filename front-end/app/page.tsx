import Link from "next/link";

export default function Home() {
  const featuredCategories = [
    { name: "Electronics", icon: "🎧", count: "3 items" },
    { name: "Clothing", icon: "👕", count: "3 items" },
    { name: "Shoes", icon: "👟", count: "3 items" },
    { name: "Accessories", icon: "🎒", count: "3 items" },
    { name: "Home", icon: "☕", count: "3 items" },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-linear-to-b from-emerald-50/60 to-transparent py-20 px-4 sm:px-6 lg:px-8 dark:from-emerald-950/20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
            Phase 2 Complete • Product System
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
            Fresh Arrivals & Everyday Essentials
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Explore our curated catalog connected seamlessly across Next.js, Express REST API, Prisma, and PostgreSQL.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-700 transition-all"
            >
              Browse All Products →
            </Link>
            <a
              href="http://localhost:5000/api/health"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-base font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-all"
            >
              Test Backend Health API
            </a>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Shop by Category
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Browse products by your favorite departments
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {featuredCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 text-center shadow-xs transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <span className="text-4xl">{cat.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors dark:text-zinc-100 dark:group-hover:text-emerald-400">
                {cat.name}
              </h3>
              <span className="mt-1 text-xs text-zinc-400">{cat.count}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
