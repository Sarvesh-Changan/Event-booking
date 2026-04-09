const categories = [
  { key: 'all', label: 'All Events', badge: 'ALL' },
  { key: 'comedy', label: 'Comedy', badge: 'COM' },
  { key: 'cricket', label: 'Cricket', badge: 'CRI' },
  { key: 'music', label: 'Music', badge: 'MUS' },
];

const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 border
            ${activeCategory === cat.key
              ? 'text-primary bg-primary/[0.08] border-primary/25 font-semibold shadow-sm'
              : 'text-text-secondary bg-white border-border hover:text-text-primary hover:border-border hover:bg-surface-secondary'
            }`}
        >
          <span className="text-xs font-bold tracking-widest px-2 py-1 rounded-lg bg-surface-secondary text-text-muted">
            {cat.badge}
          </span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
