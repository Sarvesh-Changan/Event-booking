require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory demo data (used when MongoDB is unavailable)
const demoEvents = [
  {
    _id: "60f1a1a1a1a1a1a1a1a1a101",
    title: "Zakir Khan Live — Haq Se Single",
    description: "India's favourite storyteller Zakir Khan brings his iconic 'Haq Se Single' tour with rib-tickling tales of love, heartbreak, and everyday life. An evening of non-stop laughter, relatable humor, and unforgettable punchlines.",
    category: "comedy",
    date: "2026-05-15",
    time: "19:30",
    venue: "Phoenix Marketcity Auditorium",
    city: "Mumbai",
    price: 799,
    vipPrice: 1999,
    premiumPrice: 3499,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    totalSeats: 1500,
    bookedSeats: 1240,
    artist: "Zakir Khan",
    tags: ["standup", "hindi", "comedy"],
    featured: true,
    rating: 4.8
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a102",
    title: "Comedy Night Extravaganza",
    description: "An explosive night of comedy featuring India's hottest stand-up comedians. Multiple acts, surprise guests, and an open mic segment. 3 hours of non-stop entertainment!",
    category: "comedy",
    date: "2026-05-22",
    time: "20:00",
    venue: "Canvas Laugh Club",
    city: "Delhi",
    price: 599,
    vipPrice: 1499,
    premiumPrice: 2499,
    image: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800",
    totalSeats: 800,
    bookedSeats: 450,
    artist: "Multiple Artists",
    tags: ["standup", "open-mic", "comedy"],
    featured: false,
    rating: 4.5
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a103",
    title: "Biswa Kalyan Rath — Pretentious",
    description: "The sharp, witty Biswa Kalyan Rath is back with a brand new hour of comedy. Known for cerebral humor and tech-savvy jokes, this show makes you think while you laugh.",
    category: "comedy",
    date: "2026-06-08",
    time: "19:00",
    venue: "Rangmandir Auditorium",
    city: "Bangalore",
    price: 899,
    vipPrice: 2199,
    premiumPrice: 3999,
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800",
    totalSeats: 600,
    bookedSeats: 180,
    artist: "Biswa Kalyan Rath",
    tags: ["standup", "english", "comedy"],
    featured: false,
    rating: 4.6
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a104",
    title: "IPL 2026 — MI vs CSK",
    description: "The greatest rivalry in IPL history returns! Watch Mumbai Indians take on Chennai Super Kings in this electrifying T20 clash at the iconic Wankhede Stadium under floodlights.",
    category: "cricket",
    date: "2026-05-10",
    time: "19:30",
    venue: "Wankhede Stadium",
    city: "Mumbai",
    price: 1500,
    vipPrice: 5000,
    premiumPrice: 12000,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    totalSeats: 33000,
    bookedSeats: 28500,
    artist: "MI vs CSK",
    tags: ["ipl", "T20", "cricket"],
    featured: true,
    rating: 4.9
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a105",
    title: "India vs Australia — Test Match Day 1",
    description: "The ultimate test of cricketing skill. Watch Team India battle Australia in a gripping test match. Experience red-ball cricket with India's finest batting lineup against Australia's lethal pace attack.",
    category: "cricket",
    date: "2026-06-01",
    time: "09:30",
    venue: "M. Chinnaswamy Stadium",
    city: "Bangalore",
    price: 800,
    vipPrice: 3000,
    premiumPrice: 7500,
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800",
    totalSeats: 40000,
    bookedSeats: 15000,
    artist: "India vs Australia",
    tags: ["test", "international", "cricket"],
    featured: true,
    rating: 4.7
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a106",
    title: "IPL 2026 — RCB vs KKR",
    description: "Royal Challengers Bangalore clash with Kolkata Knight Riders in a high-voltage encounter. Explosive batting, tactical bowling, and the electric IPL atmosphere. A perfect weekend cricket fest!",
    category: "cricket",
    date: "2026-05-18",
    time: "15:30",
    venue: "Eden Gardens",
    city: "Kolkata",
    price: 1200,
    vipPrice: 4500,
    premiumPrice: 10000,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    totalSeats: 68000,
    bookedSeats: 42000,
    artist: "RCB vs KKR",
    tags: ["ipl", "T20", "cricket"],
    featured: false,
    rating: 4.6
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a107",
    title: "Arijit Singh Live in Concert",
    description: "The voice of a generation, Arijit Singh, brings his magical live concert experience. Journey through his greatest Bollywood hits and soulful melodies with a 30-piece orchestra under the stars.",
    category: "music",
    date: "2026-05-25",
    time: "18:00",
    venue: "JLN Stadium",
    city: "Delhi",
    price: 1999,
    vipPrice: 5999,
    premiumPrice: 14999,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800",
    totalSeats: 25000,
    bookedSeats: 22000,
    artist: "Arijit Singh",
    tags: ["bollywood", "live", "concert"],
    featured: true,
    rating: 4.9
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a108",
    title: "Sunburn Festival 2026",
    description: "Asia's biggest electronic dance music festival returns with world-class DJs, stunning visuals, and three days of non-stop beats. Multiple stages, immersive sound experiences. Dance till dawn!",
    category: "music",
    date: "2026-06-15",
    time: "16:00",
    venue: "Vagator Beach",
    city: "Goa",
    price: 2499,
    vipPrice: 6999,
    premiumPrice: 15999,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
    totalSeats: 50000,
    bookedSeats: 35000,
    artist: "Various Artists",
    tags: ["edm", "festival", "electronic"],
    featured: true,
    rating: 4.8
  },
  {
    _id: "60f1a1a1a1a1a1a1a1a1a109",
    title: "Prateek Kuhad — The Way That Lovers Do",
    description: "Indie music sensation Prateek Kuhad performs an intimate acoustic evening. Known for his Grammy-nominated album and heartfelt lyrics, Prateek creates a cozy, magical atmosphere filled with love songs.",
    category: "music",
    date: "2026-06-20",
    time: "19:00",
    venue: "Sophia Bhabha Hall",
    city: "Mumbai",
    price: 1299,
    vipPrice: 3499,
    premiumPrice: 6999,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    totalSeats: 1200,
    bookedSeats: 750,
    artist: "Prateek Kuhad",
    tags: ["indie", "acoustic", "live"],
    featured: false,
    rating: 4.7
  }
];

let demoBookings = [];
let demoUsers = [
  { _id: "demo_user_001", name: "Demo User", email: "demo@ticketshield.com", password: "$2a$10$demo", createdAt: new Date() }
];
let dbConnected = false;

// Start server
const startServer = async () => {
  dbConnected = await connectDB();

  if (dbConnected) {
    // Use MongoDB routes
    app.use('/api/events', require('./routes/events'));
    app.use('/api/bookings', require('./routes/bookings'));
    app.use('/api/users', require('./routes/users'));
  } else {
    // Demo mode routes (no MongoDB needed)
    console.log('📦 Loading demo mode routes...');

    // Events
    app.get('/api/events', (req, res) => {
      let filtered = [...demoEvents];
      const { category, search, featured } = req.query;
      if (category && category !== 'all') {
        filtered = filtered.filter(e => e.category === category.toLowerCase());
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(e =>
          e.title.toLowerCase().includes(q) ||
          e.artist.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
        );
      }
      if (featured === 'true') {
        filtered = filtered.filter(e => e.featured);
      }
      res.json(filtered);
    });

    app.get('/api/events/:id', (req, res) => {
      const event = demoEvents.find(e => e._id === req.params.id);
      if (!event) return res.status(404).json({ message: 'Event not found' });
      res.json(event);
    });

    // Users
    app.post('/api/users/register', (req, res) => {
      const { name, email, password } = req.body;
      const existing = demoUsers.find(u => u.email === email);
      if (existing) return res.status(400).json({ message: 'User already exists' });
      const newUser = { _id: 'user_' + Date.now(), name, email, password, createdAt: new Date() };
      demoUsers.push(newUser);
      res.status(201).json({ _id: newUser._id, name, email, token: 'demo_token_' + Date.now() });
    });

    app.post('/api/users/login', (req, res) => {
      const { email } = req.body;
      const user = demoUsers.find(u => u.email === email);
      if (!user) return res.status(401).json({ message: 'Invalid email or password' });
      res.json({ _id: user._id, name: user.name, email: user.email, token: 'demo_token_' + Date.now() });
    });

    app.get('/api/users/:id', (req, res) => {
      const user = demoUsers.find(u => u._id === req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const { password, ...safe } = user;
      res.json(safe);
    });

    // Bookings
    app.post('/api/bookings', (req, res) => {
      const booking = {
        _id: 'booking_' + Date.now(),
        ...req.body,
        orderId: '#TS-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        status: 'confirmed',
        bookingDate: new Date(),
        eventId: demoEvents.find(e => e._id === req.body.eventId) || req.body.eventId
      };
      demoBookings.push(booking);
      res.status(201).json(booking);
    });

    app.get('/api/bookings/user/:userId', (req, res) => {
      const userBookings = demoBookings
        .filter(b => b.userId === req.params.userId)
        .map(b => ({
          ...b,
          eventId: typeof b.eventId === 'string'
            ? demoEvents.find(e => e._id === b.eventId) || b.eventId
            : b.eventId
        }));
      res.json(userBookings);
    });

    app.get('/api/bookings/:id', (req, res) => {
      const booking = demoBookings.find(b => b._id === req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
      res.json(booking);
    });
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', service: 'TicketShield API', mode: dbConnected ? 'database' : 'demo', timestamp: new Date() });
  });

  app.listen(PORT, () => {
    console.log(`\n🛡️  TicketShield API running on http://localhost:${PORT}`);
    console.log(`📡 Mode: ${dbConnected ? 'MongoDB Connected' : 'Demo Mode (in-memory)'}`);
    console.log(`💡 Health: http://localhost:${PORT}/api/health\n`);
  });
};

startServer();
