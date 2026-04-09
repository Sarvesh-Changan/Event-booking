import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import CategoryFilter from '../components/CategoryFilter';
import { HiOutlineSearch, HiOutlineAdjustments } from 'react-icons/hi';

const EventListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchEvents();
  }, [activeCategory, searchQuery]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== 'all') params.append('category', activeCategory);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/events?${params.toString()}`);
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) params.set('search', searchQuery);
    else params.delete('search');
    setSearchParams(params);
    fetchEvents();
  };

  const sortedEvents = [...events].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'popularity': return b.bookedSeats - a.bookedSeats;
      default: return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <div className="min-h-screen pt-[84px] pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 sm:mb-10 animate-fadeInUp">
        <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-2">
          {activeCategory !== 'all'
            ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Events`
            : 'All Events'}
        </h1>
        <p className="text-text-secondary text-sm sm:text-base">
          Discover {events.length} incredible experiences waiting for you
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-card rounded-2xl p-4 mb-8 sm:mb-10 animate-fadeInUp delay-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            <form onSubmit={handleSearch} className="flex-1 lg:flex-initial">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border/60 focus-within:border-primary/40 focus-within:bg-white focus-within:shadow-sm transition-all">
                <HiOutlineSearch className="text-text-muted text-sm" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none w-full sm:w-48 min-w-0"
                />
              </div>
            </form>

            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary border border-border/60 flex-shrink-0">
              <HiOutlineAdjustments className="text-text-muted text-sm" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm text-text-primary focus:outline-none cursor-pointer"
              >
                <option value="date">Date</option>
                <option value="price-low">Price: Low</option>
                <option value="price-high">Price: High</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="rounded-2xl bg-white/60 h-[340px] shimmer" />
          ))}
        </div>
      ) : sortedEvents.length === 0 ? (
        <div className="text-center py-16 animate-fadeIn">
          <div className="w-14 h-14 rounded-2xl bg-surface-secondary mx-auto mb-5 flex items-center justify-center text-text-muted font-bold">
            No
          </div>
          <h3 className="font-outfit font-bold text-2xl text-text-primary mb-2">No events found</h3>
          <p className="text-text-secondary text-sm max-w-sm mx-auto">Try adjusting your search or filters to find what you are looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {sortedEvents.map((event, i) => (
            <div key={event._id} className="animate-fadeInUp h-full" style={{ animationDelay: `${i * 0.05}s` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default EventListing;
