import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import TicketSelector from '../components/TicketSelector';
import EventCard from '../components/EventCard';
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineShare,
  HiOutlineHeart,
} from 'react-icons/hi';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, addToCart, showNotification } = useBooking();
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketType, setTicketType] = useState('standard');
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);

        const relRes = await fetch(`/api/events?category=${data.category}`);
        const relData = await relRes.json();
        setRelatedEvents(Array.isArray(relData) ? relData.filter(e => e._id !== id).slice(0, 3) : []);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBookNow = () => {
    if (!user) {
      showNotification('Please sign in to book tickets', 'error');
      navigate('/dashboard');
      return;
    }
    addToCart(event, ticketType, quantity);
    navigate('/checkout');
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4 px-4 sm:px-6">
        <div className="w-12 h-12 rounded-2xl bg-surface-secondary flex items-center justify-center text-text-muted font-bold">
          No
        </div>
        <h2 className="font-outfit font-bold text-2xl">Event Not Found</h2>
        <Link to="/events" className="text-primary font-semibold hover:underline">Browse all events</Link>
      </div>
    );
  }

  const seatsLeft = event.totalSeats - event.bookedSeats;
  const percentBooked = Math.round((event.bookedSeats / event.totalSeats) * 100);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Image */}
      <div className="relative h-[45vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-md border border-white/15 ${
                event.category === 'comedy' ? 'bg-purple-500/70 text-white' :
                event.category === 'cricket' ? 'bg-emerald-500/70 text-white' :
                'bg-amber-500/70 text-white'
              }`}>
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </span>
              {event.featured && (
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary/70 text-white backdrop-blur-md border border-white/15">
                  Trending
                </span>
              )}
            </div>
            <h1 className="font-outfit font-black text-2xl sm:text-4xl md:text-5xl text-white mb-3 leading-tight max-w-3xl">
              {event.title}
            </h1>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <HiOutlineStar className="text-amber-400" />
              <span className="font-semibold">{event.rating}</span>
              <span className="mx-1 text-white/40">-</span>
              <span>{event.artist}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-20 sm:top-24 right-4 sm:right-8 flex flex-col gap-2.5">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border border-white/15 ${
              liked ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
          >
            <HiOutlineHeart className={`text-lg ${liked ? 'fill-current' : ''}`} />
          </button>
          <button className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/15 text-white hover:bg-white/25 flex items-center justify-center transition-all duration-300">
            <HiOutlineShare className="text-lg" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 animate-fadeInUp">
              {[
                { icon: HiOutlineCalendar, label: 'Date', value: formatDate(event.date) },
                { icon: HiOutlineClock, label: 'Time', value: event.time },
                { icon: HiOutlineLocationMarker, label: 'Venue', value: `${event.venue}, ${event.city}` },
                { icon: HiOutlineUsers, label: 'Seats Left', value: seatsLeft.toLocaleString() },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-2xl p-4 text-center hover:shadow-md transition-all duration-300">
                  <item.icon className="text-primary text-xl mx-auto mb-2" />
                  <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">{item.label}</p>
                  <p className="text-xs font-semibold text-text-primary leading-tight">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Capacity Bar */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 animate-fadeInUp delay-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-text-primary">Seat Availability</span>
                <span className="text-sm font-bold text-primary">{event.bookedSeats.toLocaleString()} / {event.totalSeats.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    percentBooked > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' :
                    percentBooked > 50 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                    'bg-gradient-to-r from-emerald-400 to-teal-500'
                  }`}
                  style={{ width: `${percentBooked}%` }}
                />
              </div>
              {percentBooked > 80 && (
                <p className="text-xs text-red-500 font-semibold mt-2.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Selling fast. Only {seatsLeft.toLocaleString()} seats remaining
                </p>
              )}
            </div>

            {/* Description */}
            <div className="animate-fadeInUp delay-200">
              <h2 className="font-outfit font-bold text-xl sm:text-2xl text-text-primary mb-4">About This Event</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap animate-fadeInUp delay-300">
                {event.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-primary/[0.04] text-primary text-xs font-semibold border border-primary/10">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1 animate-slideInRight">
            <div className="glass-card rounded-2xl p-6 shadow-lg lg:sticky lg:top-24">
              <div className="text-center pb-5 mb-5 border-b border-border/60">
                <p className="text-xs text-text-muted uppercase tracking-wider font-semibold mb-1">Starting from</p>
                <p className="font-outfit font-black text-4xl gradient-text">INR {event.price.toLocaleString()}</p>
              </div>

              <TicketSelector
                event={event}
                selectedType={ticketType}
                quantity={quantity}
                onTypeChange={setTicketType}
                onQuantityChange={setQuantity}
              />

              <button
                onClick={handleBookNow}
                disabled={seatsLeft === 0}
                className={`w-full py-4 rounded-xl font-bold text-white text-base shadow-lg transition-all duration-300 mt-6
                  ${seatsLeft === 0
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-gradient-to-r from-primary to-primary-dark shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] animate-pulse-glow'
                  }`}
              >
                {seatsLeft === 0 ? 'Sold Out' : 'Book Now'}
              </button>

              <p className="text-xs text-text-muted text-center mt-3">
                Secure checkout - Instant confirmation - Free cancellation
              </p>
            </div>
          </div>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h2 className="font-outfit font-bold text-xl sm:text-2xl text-text-primary mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {relatedEvents.map((evt, i) => (
                <div key={evt._id} className="animate-fadeInUp h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                  <EventCard event={evt} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
