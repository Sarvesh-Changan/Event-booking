import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import {
  HiOutlineTicket,
  HiOutlineCash,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineChartBar,
  HiOutlineLogout,
  HiOutlineShoppingBag,
} from 'react-icons/hi';

const Dashboard = () => {
  const { user, login, register, logout, bookings, fetchBookings } = useBooking();
  const [activeTab, setActiveTab] = useState('overview');
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    let result;
    if (authMode === 'login') {
      result = await login(authForm.email, authForm.password);
    } else {
      result = await register(authForm.name, authForm.email, authForm.password);
    }
    setAuthLoading(false);
    if (!result.success) {
      setAuthError(result.message || 'Something went wrong');
    }
  };

  // Auth Screen
  if (!user) {
    return (
      <div className="min-h-screen pt-[84px] flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fadeInUp">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary/25">
              <HiOutlineTicket className="text-white text-2xl" />
            </div>
            <h1 className="font-outfit font-bold text-3xl text-text-primary">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-text-secondary text-sm mt-2">
              {authMode === 'login' ? 'Sign in to manage your bookings' : 'Join TicketShield for the best events'}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-7 sm:p-8 shadow-lg animate-fadeInUp delay-100">
            <div className="flex rounded-xl bg-surface-secondary p-1 mb-7">
              {['login', 'register'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => { setAuthMode(mode); setAuthError(''); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300
                    ${authMode === mode ? 'bg-white text-primary shadow-sm' : 'text-text-muted hover:text-text-secondary'}`}
                >
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
              ))}
            </div>

            <form onSubmit={handleAuth} className="space-y-5">
              {authMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">Full Name</label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                    placeholder="Your name"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Password</label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="********"
                />
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">{authError}</div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {authLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : authMode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {authMode === 'login' && (
              <div className="mt-5 pt-5 border-t border-border/50 text-center">
                <p className="text-xs text-text-muted">
                  Demo credentials: <span className="font-semibold text-primary">demo@ticketshield.com</span> / <span className="font-semibold text-primary">demo1234</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const totalSpent = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const totalTickets = bookings.reduce((sum, b) => sum + (b.tickets || 0), 0);

  const sidebarItems = [
    { key: 'overview', label: 'Overview', icon: HiOutlineChartBar },
    { key: 'bookings', label: 'My Bookings', icon: HiOutlineTicket },
    { key: 'profile', label: 'Profile', icon: HiOutlineUser },
  ];

  const getStatusBadge = (booking) => {
    const eventDate = new Date(booking.eventId?.date);
    const now = new Date();
    if (booking.status === 'cancelled') return { label: 'CANCELLED', color: 'bg-red-50 text-red-600 border border-red-100' };
    if (eventDate < now) return { label: 'COMPLETED', color: 'bg-gray-50 text-gray-600 border border-gray-100' };
    const diff = (eventDate - now) / (1000 * 60 * 60 * 24);
    if (diff < 3) return { label: 'LIVE SOON', color: 'bg-emerald-50 text-emerald-600 border border-emerald-100' };
    return { label: 'UPCOMING', color: 'bg-blue-50 text-blue-600 border border-blue-100' };
  };

  return (
    <div className="min-h-screen pt-[84px] pb-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 animate-fadeInUp">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-text-primary">
            Dashboard
          </h1>
          <p className="text-text-secondary text-sm mt-1">Welcome back, {user.name?.split(' ')[0]}</p>
        </div>
        <Link to="/events" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300 self-start sm:self-auto">
          <HiOutlineTicket className="text-base" />
          Book New Event
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 animate-fadeInUp delay-100">
          <div className="glass-card rounded-2xl p-3 lg:sticky lg:top-24">
            {/* Mobile: horizontal, Desktop: vertical */}
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {sidebarItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 lg:w-full
                    ${activeTab === item.key
                      ? 'text-primary bg-primary/[0.08] font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
                    }`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop sidebar extras */}
            <div className="hidden lg:block mt-3 pt-3 border-t border-border/50">
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                <HiOutlineLogout className="text-lg" />
                Logout
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 mt-3 pt-3 border-t border-border/50 px-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm ring-2 ring-white shadow-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">{user.name}</p>
                <p className="text-xs text-text-muted">Member</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-4 space-y-8">
          {/* Stats */}
          {(activeTab === 'overview' || activeTab === 'bookings') && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 animate-fadeInUp delay-200">
              {[
                { label: 'Total Spent', value: `INR ${totalSpent.toLocaleString()}`, sub: `Across ${bookings.length} bookings`, icon: HiOutlineCash, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50' },
                { label: 'Tickets Booked', value: totalTickets, sub: 'All event types', icon: HiOutlineTicket, iconColor: 'text-primary', iconBg: 'bg-primary/[0.06]' },
                { label: 'Experience Level', value: totalTickets > 10 ? 'Superfan' : totalTickets > 5 ? 'Enthusiast' : totalTickets > 0 ? 'Explorer' : 'Newbie', sub: 'Keep booking to level up', icon: HiOutlineChartBar, iconColor: 'text-amber-500', iconBg: 'bg-amber-50' },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                      <stat.icon className={`text-lg ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="font-outfit font-black text-2xl sm:text-3xl text-text-primary leading-tight">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-2">{stat.sub}</p>
                </div>
              ))}
            </div>
          )}

          {/* Bookings List */}
          {(activeTab === 'overview' || activeTab === 'bookings') && (
            <div className="glass-card rounded-2xl overflow-hidden animate-fadeInUp delay-300">
              <div className="px-6 py-5 border-b border-border/50">
                <h2 className="font-outfit font-bold text-lg text-text-primary">
                  {activeTab === 'overview' ? 'Recent Bookings' : 'All Bookings'}
                </h2>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center">
                  <HiOutlineShoppingBag className="text-5xl text-text-muted mx-auto mb-4" />
                  <h3 className="font-outfit font-bold text-lg text-text-primary mb-2">No bookings yet</h3>
                  <p className="text-sm text-text-secondary mb-6 max-w-sm mx-auto">Start exploring events and book your first ticket.</p>
                  <Link to="/events" className="inline-flex px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20">
                    Explore Events
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {(activeTab === 'overview' ? bookings.slice(0, 5) : bookings).map((booking) => {
                    const status = getStatusBadge(booking);
                    const event = booking.eventId;
                    return (
                      <div key={booking._id} className="flex flex-col sm:flex-row sm:items-center gap-4 px-6 py-4 hover:bg-surface-secondary/50 transition-colors">
                        <img
                          src={event?.image || 'https://via.placeholder.com/80'}
                          alt={event?.title || 'Event'}
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover flex-shrink-0 ring-1 ring-border/30"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-text-primary truncate">{event?.title || 'Event'}</h4>
                          <p className="text-xs text-text-muted mt-0.5 truncate">
                            {event?.venue || ''}{event?.city ? `, ${event.city}` : ''}
                          </p>
                          <div className="sm:hidden text-xs text-text-secondary mt-1">
                            {event?.date || ''} - {booking.ticketType} x {booking.tickets}
                          </div>
                        </div>
                        <div className="hidden sm:block text-right flex-shrink-0">
                          <p className="text-xs text-text-muted">{event?.date || ''}</p>
                          <p className="text-xs font-medium text-text-secondary capitalize mt-0.5">{booking.ticketType} x {booking.tickets}</p>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0 space-y-1">
                          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold ${status.color}`}>
                            {status.label}
                          </span>
                          <p className="text-sm font-bold text-text-primary">INR {booking.totalAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="glass-card rounded-2xl p-7 sm:p-8 animate-fadeInUp delay-200">
              <h2 className="font-outfit font-bold text-lg text-text-primary mb-8">Profile Information</h2>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 pb-8 border-b border-border/50">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-primary/20 flex-shrink-0 ring-4 ring-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-outfit font-bold text-xl text-text-primary">{user.name}</h3>
                  <p className="text-sm text-text-secondary flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                    <HiOutlineMail className="text-primary/60" /> {user.email}
                  </p>
                  <p className="text-xs text-text-muted mt-1.5">
                    Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl bg-gradient-to-r from-primary/[0.03] to-accent/[0.03] border border-primary/10">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">Total Events</p>
                  <p className="font-outfit font-bold text-2xl text-text-primary">{bookings.length}</p>
                </div>
                <div className="p-5 rounded-xl bg-gradient-to-r from-primary/[0.03] to-accent/[0.03] border border-primary/10">
                  <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">Total Spent</p>
                  <p className="font-outfit font-bold text-2xl text-text-primary">INR {totalSpent.toLocaleString()}</p>
                </div>
              </div>

              <div className="lg:hidden mt-6 pt-6 border-t border-border/50">
                <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-all">
                  <HiOutlineLogout className="text-lg" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
