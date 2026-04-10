import { Link } from 'react-router-dom';
import { HiOutlineTicket } from 'react-icons/hi';
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-8">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="py-12 sm:py-16 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md shadow-primary/20">
                <HiOutlineTicket className="text-white text-lg" />
              </div>
              <span className="font-outfit font-bold text-xl">
                <span className="gradient-text">Ticket</span>
                <span className="text-text-primary">Shield</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-[260px]">
              Your premium event ticket booking platform. Discover, book, and experience unforgettable moments.
            </p>
            <div className="flex items-center gap-2.5">
              {[FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-text-primary mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Events', 'Dashboard'].map((item) => (
                <li key={item}>
                  <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-text-primary mb-5 uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3">
              {['Comedy Shows', 'Cricket Matches', 'Music Concerts'].map((item) => (
                <li key={item}>
                  <Link to="/events" className="text-sm text-text-secondary hover:text-primary transition-colors duration-200">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-outfit font-bold text-sm text-text-primary mb-5 uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">Get notified about trending events and exclusive offers.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 min-w-0 px-4 py-2.5 rounded-xl bg-white border border-border text-sm focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            Copyright 2026 TicketShield. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Support'].map((item) => (
              <a key={item} href="#" className="text-xs text-text-muted hover:text-primary transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
