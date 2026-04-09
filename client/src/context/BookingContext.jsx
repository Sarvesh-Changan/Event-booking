import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ticketshield_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [bookings, setBookings] = useState([]);
  const [cart, setCart] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ticketshield_user', JSON.stringify(user));
      fetchBookings();
    } else {
      localStorage.removeItem('ticketshield_user');
      setBookings([]);
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/bookings/user/${user._id}`);
      const data = await res.json();
      if (Array.isArray(data)) setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const login = async (email, password) => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      showNotification('Welcome back!', 'success');
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const register = async (name, email, password) => {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data);
      showNotification('Account created!', 'success');
      return { success: true };
    }
    return { success: false, message: data.message };
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setCart(null);
    showNotification('Logged out successfully', 'info');
  };

  const addToCart = (event, ticketType, quantity) => {
    const priceMap = {
      standard: event.price,
      vip: event.vipPrice || event.price * 2.5,
      premium: event.premiumPrice || event.price * 4,
    };
    setCart({
      event,
      ticketType,
      quantity,
      unitPrice: priceMap[ticketType],
      totalAmount: priceMap[ticketType] * quantity,
    });
  };

  const clearCart = () => setCart(null);

  const createBooking = async (bookingData) => {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    const data = await res.json();
    if (res.ok) {
      setBookings(prev => [data, ...prev]);
      setCart(null);
      showNotification('Booking confirmed!', 'success');
      return { success: true, booking: data };
    }
    return { success: false, message: data.message };
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <BookingContext.Provider value={{
      user, login, register, logout,
      bookings, fetchBookings,
      cart, addToCart, clearCart,
      createBooking,
      notification, showNotification,
    }}>
      {children}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl animate-fadeInUp font-inter font-medium text-white
          ${notification.type === 'success' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
            notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
            'bg-gradient-to-r from-primary to-accent'}`}>
          {notification.message}
        </div>
      )}
    </BookingContext.Provider>
  );
};
