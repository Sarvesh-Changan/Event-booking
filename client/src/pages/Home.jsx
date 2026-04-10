import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import {
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineLightningBolt,
  HiOutlineEmojiHappy,
  HiOutlineFlag,
  HiOutlineMusicNote,
  HiOutlineTicket,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineGlobeAlt,
} from 'react-icons/hi';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [allRes, featuredRes] = await Promise.all([
          fetch('/api/events'),
          fetch('/api/events?featured=true'),
        ]);
        const allData = await allRes.json();
        const featuredData = await featuredRes.json();
        setEvents(Array.isArray(allData) ? allData : []);
        setFeaturedEvents(Array.isArray(featuredData) ? featuredData : []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = [
    { key: 'comedy', label: 'Comedy', icon: HiOutlineEmojiHappy, desc: 'Stand-up and sketches', gradient: 'from-purple-500 to-violet-600' },
    { key: 'cricket', label: 'Cricket', icon: HiOutlineFlag, desc: 'Live matches and leagues', gradient: 'from-emerald-500 to-teal-600' },
    { key: 'music', label: 'Music', icon: HiOutlineMusicNote, desc: 'Concerts and festivals', gradient: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Trending Events */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
                <HiOutlineLightningBolt className="text-primary text-sm" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Trending</span>
            </div>
            <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-text-primary leading-tight">
              Hot Right Now
            </h2>
            <p className="text-text-secondary text-sm sm:text-base mt-2 max-w-md">The most anticipated events trending globally.</p>
          </div>
          <Link to="/events" className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-text-secondary hover:text-primary hover:border-primary/40 hover:bg-primary/[0.02] transition-all duration-300 flex-shrink-0">
            View All <HiOutlineArrowRight className="text-xs" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl bg-white/60 h-[340px] shimmer" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {(featuredEvents.length > 0 ? featuredEvents : events).slice(0, 8).map((event, i) => (
              <div key={event._id} className="animate-fadeInUp h-full" style={{ animationDelay: `${i * 0.08}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}

        <div className="sm:hidden mt-10 text-center">
          <Link to="/events" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-lg shadow-primary/20">
            View All Events <HiOutlineArrowRight />
          </Link>
        </div>
        </div>
      </section>

      {/* Explore by Vibe */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <HiOutlineSparkles className="text-primary text-sm" />
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-widest">Categories</span>
          </div>
          <h2 className="font-outfit font-extrabold text-3xl sm:text-4xl text-text-primary">
            Explore by Vibe
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.key}
              to={`/events?category=${cat.key}`}
              className="group relative overflow-hidden rounded-2xl h-48 sm:h-52 animate-fadeInUp shadow-lg hover:shadow-xl transition-shadow duration-500"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-all duration-500`} />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500" />
              <div className="relative h-full flex flex-col items-center justify-center text-white p-6 gap-2.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <cat.icon className="text-2xl" />
                </div>
                <h3 className="font-outfit font-bold text-2xl drop-shadow-sm">{cat.label}</h3>
                <p className="text-white/75 text-sm font-medium">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#9F1239]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.06] rounded-full blur-3xl translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.04] rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="text-center lg:text-left max-w-lg">
                <h2 className="font-outfit font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4">
                  NEVER MISS A<br />
                  <span className="text-white/80">BEAT.</span>
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                  TicketShield tracks real-time data from social signals and ticket movements to tell you exactly when to book.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Link to="/events" className="px-8 py-4 rounded-xl bg-white text-primary font-bold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center whitespace-nowrap">
                  Explore Events
                </Link>
                <Link to="/dashboard" className="px-8 py-4 rounded-xl border-2 border-white/25 text-white font-bold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 text-center whitespace-nowrap">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Stats */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '50K+', label: 'Tickets Sold', icon: HiOutlineTicket },
            { value: '200+', label: 'Events Listed', icon: HiOutlineCalendar },
            { value: '15K+', label: 'Happy Users', icon: HiOutlineUsers },
            { value: '25+', label: 'Cities Covered', icon: HiOutlineGlobeAlt },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 text-center card-hover animate-fadeInUp" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon className="text-primary text-lg" />
              </div>
              <p className="font-outfit font-black text-2xl sm:text-3xl gradient-text leading-none">{stat.value}</p>
              <p className="text-xs text-text-muted mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
