import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventListing from './pages/EventListing';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <BookingProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<EventListing />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BookingProvider>
    </Router>
  );
}

export default App;
