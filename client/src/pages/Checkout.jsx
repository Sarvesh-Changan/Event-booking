import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import {
  HiOutlineTicket,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCheck,
  HiOutlineLockClosed,
  HiOutlineCreditCard,
} from 'react-icons/hi';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, cart, createBooking, showNotification } = useBooking();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
  });
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  if (!cart && !confirmed) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4 sm:px-6 gap-4">
        <div className="w-12 h-12 rounded-2xl bg-surface-secondary flex items-center justify-center text-text-muted font-bold">
          No
        </div>
        <h2 className="font-outfit font-bold text-2xl text-text-primary">Your cart is empty</h2>
        <p className="text-text-secondary text-sm text-center max-w-xs">Browse events and add tickets to get started.</p>
        <Link to="/events" className="px-7 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm shadow-lg shadow-primary/20 mt-2">
          Browse Events
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name || !formData.email) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    setProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const result = await createBooking({
      eventId: cart.event._id,
      userId: user._id,
      userName: formData.name,
      email: formData.email,
      phone: formData.phone,
      tickets: cart.quantity,
      ticketType: cart.ticketType,
      totalAmount: cart.totalAmount,
    });

    setProcessing(false);
    if (result.success) {
      setConfirmed(true);
      setBookingResult(result.booking);
    }
  };

  // Confirmation Screen
  if (confirmed && bookingResult) {
    const event = bookingResult.eventId?.title ? bookingResult.eventId : cart?.event;
    return (
      <div className="min-h-screen pt-[84px] pb-16">
        <div className="max-w-xl mx-auto px-5 sm:px-6">
        {/* Success Header */}
        <div className="text-center mb-10 animate-fadeInUp">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200/50">
            <HiOutlineCheck className="text-white text-3xl" />
          </div>
          <h1 className="font-outfit font-black text-3xl sm:text-4xl text-text-primary mb-2">Booking Confirmed</h1>
          <p className="text-text-secondary text-sm">Get ready for an amazing experience</p>
        </div>

        {/* Ticket Card */}
        <div className="glass-card rounded-3xl overflow-hidden shadow-xl animate-fadeInUp delay-100">
          <div className="bg-gradient-to-r from-primary/[0.04] to-accent/[0.04] p-5 sm:p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">Order ID</p>
                <p className="font-outfit font-bold text-lg text-text-primary">{bookingResult.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-text-muted uppercase tracking-widest font-semibold">Booked</p>
                <p className="font-medium text-sm text-text-primary">
                  {new Date(bookingResult.bookingDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-8 text-center border-b border-border/50">
            <div className="w-36 h-36 mx-auto bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg mb-4">
              <div className="grid grid-cols-5 gap-1 p-4">
                {Array(25).fill(0).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.4 ? 'bg-white' : 'bg-transparent'}`} />
                ))}
              </div>
            </div>
            <p className="font-bold text-sm text-primary">SCAN FOR ENTRY</p>
            <p className="text-xs text-text-muted mt-1">Present this QR at the door</p>
          </div>

          {/* Event Info */}
          <div className="p-5 sm:p-6 space-y-5">
            <h3 className="font-outfit font-bold text-lg text-text-primary">{event?.title || 'Event'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                  <HiOutlineCalendar className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-semibold">When</p>
                  <p className="text-xs font-semibold text-text-primary">{event?.time}, {event?.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                  <HiOutlineTicket className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase font-semibold">Tickets</p>
                  <p className="text-xs font-semibold text-text-primary capitalize">{bookingResult.ticketType} x {bookingResult.tickets}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/[0.04] to-accent/[0.04] border border-primary/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-text-secondary">Total Paid</span>
                <span className="font-outfit font-black text-2xl gradient-text">INR {bookingResult.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fadeInUp delay-200">
          <Link to="/events" className="flex-1 py-3.5 rounded-xl text-center font-bold text-primary border-2 border-primary/20 hover:bg-primary/[0.03] transition-all text-sm">
            Explore More
          </Link>
          <Link to="/dashboard" className="flex-1 py-3.5 rounded-xl text-center font-bold text-white bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/20 transition-all text-sm">
            Dashboard
          </Link>
        </div>
        </div>
      </div>
    );
  }

  // Checkout Form
  return (
    <div className="min-h-screen pt-[84px] pb-16">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
      <div className="mb-10 animate-fadeInUp">
        <h1 className="font-outfit font-extrabold text-3xl sm:text-4xl text-text-primary mb-1">Checkout</h1>
        <p className="text-text-secondary text-sm">Complete your booking in just a few steps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6 animate-fadeInUp delay-100">
          {/* Personal Details */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-outfit font-bold text-base text-text-primary mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">1</span>
              Personal Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-border/60 text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>
            </form>
          </div>

          {/* Payment */}
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-outfit font-bold text-base text-text-primary mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-black flex items-center justify-center">2</span>
              Payment Method
            </h2>
            <div className="space-y-3">
              {[
                { label: 'Credit / Debit Card', icon: HiOutlineCreditCard, sub: 'XXXX XXXX XXXX 4242', active: true },
                { label: 'UPI Payment', icon: HiOutlineLockClosed, sub: 'Google Pay, PhonePe, Paytm', active: false },
              ].map((method, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${method.active ? 'border-primary bg-primary/[0.03]' : 'border-border/60 hover:border-primary/20'}`}>
                  <div className="w-10 h-10 rounded-xl bg-primary/[0.06] flex items-center justify-center flex-shrink-0">
                    <method.icon className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-text-primary">{method.label}</p>
                    <p className="text-xs text-text-muted">{method.sub}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${method.active ? 'border-primary' : 'border-border'}`}>
                    {method.active && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2 animate-slideInRight">
          <div className="glass-card rounded-2xl p-6 shadow-lg lg:sticky lg:top-24">
            <h2 className="font-outfit font-bold text-base text-text-primary mb-6">Order Summary</h2>

            <div className="flex items-start gap-4 pb-6 border-b border-border/50">
              <img src={cart.event.image} alt={cart.event.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-text-primary line-clamp-2 leading-snug">{cart.event.title}</h3>
                <p className="text-xs text-text-secondary mt-1.5 flex items-center gap-1">
                  <HiOutlineLocationMarker className="text-primary/60 flex-shrink-0" />
                  <span className="truncate">{cart.event.venue}, {cart.event.city}</span>
                </p>
                <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                  <HiOutlineCalendar className="text-primary/60 flex-shrink-0" />
                  {cart.event.date}
                </p>
              </div>
            </div>

            <div className="py-5 space-y-3 border-b border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary capitalize">{cart.ticketType} x {cart.quantity}</span>
                <span className="text-sm font-semibold text-text-primary">INR {(cart.unitPrice * cart.quantity).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Convenience Fee</span>
                <span className="text-sm font-semibold text-text-primary">INR {Math.round(cart.totalAmount * 0.02).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">GST (18%)</span>
                <span className="text-sm font-semibold text-text-primary">INR {Math.round(cart.totalAmount * 0.18).toLocaleString()}</span>
              </div>
            </div>

            <div className="py-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-text-primary">Total</span>
                <span className="font-outfit font-black text-2xl gradient-text">
                  INR {Math.round(cart.totalAmount * 1.2).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={processing}
              className={`w-full py-4 rounded-xl font-bold text-white text-base shadow-lg transition-all duration-300
                ${processing ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-primary to-primary-dark shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]'}`}
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Processing...
                </span>
              ) : (
                `Pay INR ${Math.round(cart.totalAmount * 1.2).toLocaleString()}`
              )}
            </button>
            <p className="text-xs text-text-muted text-center mt-3">Secure checkout - 256-bit SSL - PCI DSS compliant</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Checkout;
