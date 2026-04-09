import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { HiOutlineTicket, HiOutlineUser, HiOutlineSearch, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useBooking();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-border/50'
        : 'bg-white/60 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px] min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow duration-300 flex-shrink-0">
              <HiOutlineTicket className="text-white text-lg" />
            </div>
            <span className="font-outfit font-bold text-lg sm:text-xl tracking-tight truncate max-w-[140px] sm:max-w-none">
              <span className="gradient-text">Ticket</span>
              <span className="text-text-primary">Shield</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-surface-secondary/80 rounded-xl p-1 flex-1 justify-center max-w-[520px] mx-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 lg:px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${isActive(link.path)
                    ? 'text-primary bg-white shadow-sm font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <Link to="/events" className="p-2.5 rounded-xl hover:bg-surface-secondary text-text-secondary hover:text-primary transition-all duration-200">
              <HiOutlineSearch className="text-lg" />
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2.5 pl-3 pr-4 py-1.5 rounded-xl hover:bg-surface-secondary transition-all duration-200 border border-transparent hover:border-border"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-text-primary truncate max-w-[140px]">{user.name?.split(' ')[0]}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-border/50 py-2 animate-scaleIn origin-top-right">
                    <div className="px-4 py-2.5 border-b border-border/50">
                      <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                      <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                    <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-primary hover:bg-surface-secondary transition-colors">
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setShowUserMenu(false); }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-danger hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/dashboard" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.03] transition-all duration-300">
                <HiOutlineUser className="text-base" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl text-text-primary hover:bg-surface-secondary transition-colors"
          >
            {mobileMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border/50 shadow-lg animate-fadeIn">
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive(link.path)
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-text-secondary hover:text-primary hover:bg-surface-secondary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/dashboard" className="block w-full text-center px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold mt-2">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
