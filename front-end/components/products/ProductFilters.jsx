"use client";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Shoes",
  "Accessories",
  "Home",
];

export default function ProductFilters({ selectedCategory = "All", onSelectCategory }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map((category) => {
        const isSelected =
          (selectedCategory === "" && category === "All") ||
          selectedCategory.toLowerCase() === category.toLowerCase();

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category === "All" ? "" : category)}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all ${
              isSelected
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
