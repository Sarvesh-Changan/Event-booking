import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineLocationMarker, HiArrowRight } from 'react-icons/hi';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden pt-[68px]">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-20 w-[400px] h-[400px] bg-primary/[0.07] rounded-full blur-[80px] animate-float" />
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] rounded-full blur-[60px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-sm mb-8 animate-fadeInUp">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase">Discover events near you</span>
        </div>

        {/* Headline */}
        <h1 className="font-outfit font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] mb-5 sm:mb-6 animate-fadeInUp delay-100">
          <span className="text-text-primary">FEEL THE</span>
          <br />
          <span className="gradient-text">PULSE.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-text-secondary max-w-xl mx-auto mb-8 sm:mb-10 animate-fadeInUp delay-200 leading-relaxed">
          Discover and book tickets for the hottest comedy shows, cricket matches, and music concerts. Your next unforgettable experience awaits.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="animate-fadeInUp delay-300">
          <div className="flex flex-col sm:flex-row sm:items-center max-w-2xl mx-auto rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-border/60 overflow-hidden focus-within:shadow-[0_4px_32px_rgba(225,29,72,0.1)] focus-within:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-2.5 flex-1 px-5 py-4 min-w-0">
              <HiOutlineSearch className="text-text-muted text-lg flex-shrink-0" />
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted focus:outline-none min-w-0"
              />
            </div>
            <div className="hidden sm:flex items-center gap-2 px-5 border-l border-border/60">
              <HiOutlineLocationMarker className="text-text-muted" />
              <span className="text-sm text-text-secondary">Anywhere</span>
            </div>
            <button
              type="submit"
              className="m-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300 flex items-center gap-2 whitespace-nowrap w-[calc(100%-16px)] sm:w-auto justify-center"
            >
              Find Events
              <HiArrowRight className="text-sm" />
            </button>
          </div>
        </form>

        {/* Quick Filters */}
        <div className="flex items-center justify-center gap-2 mt-8 animate-fadeInUp delay-400 flex-wrap">
          <span className="text-xs text-text-muted font-medium">Popular:</span>
          {['Arijit Singh', 'IPL 2026', 'Standup Comedy', 'Sunburn'].map((tag) => (
            <button
              key={tag}
              onClick={() => { setSearchQuery(tag); navigate(`/events?search=${encodeURIComponent(tag)}`); }}
              className="px-3.5 py-1.5 rounded-full bg-white/80 border border-border/60 text-xs font-medium text-text-secondary hover:text-primary hover:border-primary/30 hover:bg-white hover:shadow-sm transition-all duration-300"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
