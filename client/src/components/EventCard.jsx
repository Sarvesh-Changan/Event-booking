import { Link } from 'react-router-dom';
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineStar } from 'react-icons/hi';

const categoryColors = {
  comedy: { bg: 'bg-purple-500/10', text: 'text-purple-600', dot: 'bg-purple-500' },
  cricket: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-500' },
  music: { bg: 'bg-amber-500/10', text: 'text-amber-600', dot: 'bg-amber-500' },
};

const EventCard = ({ event }) => {
  const colors = categoryColors[event.category] || categoryColors.music;
  const seatsLeft = event.totalSeats - event.bookedSeats;
  const percentBooked = Math.round((event.bookedSeats / event.totalSeats) * 100);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Link to={`/events/${event._id}`} className="group block h-full">
      <div className="glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Category Badge */}
            <div className={`absolute top-3.5 left-3.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${colors.bg} ${colors.text} backdrop-blur-md border border-white/20`}>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors.dot} mr-1.5 align-middle`} />
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </div>

          {/* Featured Badge */}
          {event.featured && (
            <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30">
              Trending
            </div>
          )}

          {/* Price Tag */}
          <div className="absolute bottom-3.5 right-3.5 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-sm text-sm font-bold text-text-primary shadow-lg">
            INR {event.price.toLocaleString()}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <h3 className="font-outfit font-bold text-sm text-text-primary line-clamp-1 group-hover:text-primary transition-colors duration-300 leading-snug">
            {event.title}
          </h3>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-text-secondary">
              <HiOutlineCalendar className="text-primary/60 flex-shrink-0" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-text-secondary min-w-0">
              <HiOutlineLocationMarker className="text-primary/60 flex-shrink-0" />
              <span className="truncate">{event.city}</span>
            </span>
          </div>

          {/* Rating & Seats - pushed to bottom */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-light">
            <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
              <HiOutlineStar className="text-amber-500" />
              {event.rating}
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${percentBooked > 80 ? 'bg-red-500' : percentBooked > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${percentBooked}%` }}
                />
              </div>
              <span className={`text-xs font-semibold whitespace-nowrap ${seatsLeft < 100 ? 'text-red-500' : 'text-text-muted'}`}>
                {seatsLeft < 100 ? `${seatsLeft} left` : `${seatsLeft.toLocaleString()} left`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
