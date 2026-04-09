const mongoose = require('mongoose');
const Event = require('./models/Event');
const User = require('./models/User');
const connectDB = require('./config/db');

const events = [
  // COMEDY EVENTS
  {
    title: "Zakir Khan Live — Haq Se Single",
    description: "India's favourite storyteller Zakir Khan brings his iconic 'Haq Se Single' tour with rib-tickling tales of love, heartbreak, and everyday life. An evening of non-stop laughter, relatable humor, and unforgettable punchlines that will leave you in stitches.",
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
    title: "Comedy Night Extravaganza",
    description: "An explosive night of comedy featuring India's hottest stand-up comedians. Multiple acts, surprise guests, and an open mic segment. Get ready for 3 hours of non-stop entertainment that'll make your cheeks hurt from laughing!",
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
    title: "Biswa Kalyan Rath — Pretentious",
    description: "The sharp, witty, and unapologetically honest Biswa Kalyan Rath is back with a brand new hour of comedy. Known for his cerebral humor and tech-savvy jokes, this show promises to make you think while you laugh.",
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

  // CRICKET EVENTS
  {
    title: "IPL 2026 — MI vs CSK",
    description: "The greatest rivalry in IPL history returns! Watch Mumbai Indians take on Chennai Super Kings in this electrifying T20 clash. Expect sixes, wickets, and edge-of-seat drama at the iconic Wankhede Stadium under the floodlights.",
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
    title: "India vs Australia — Test Match Day 1",
    description: "The ultimate test of cricketing skill and endurance. Watch Team India battle Australia in a gripping test match. Experience the thrill of red-ball cricket with India's finest batting lineup against Australia's lethal pace attack.",
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
    title: "IPL 2026 — RCB vs KKR",
    description: "Royal Challengers Bangalore clash with Kolkata Knight Riders in a high-voltage encounter. Witness explosive batting, tactical bowling changes, and the electric atmosphere that only the IPL can deliver. A perfect weekend cricket fest!",
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

  // MUSIC EVENTS
  {
    title: "Arijit Singh Live in Concert",
    description: "The voice of a generation, Arijit Singh, brings his magical live concert experience. Journey through his greatest Bollywood hits, soulful melodies, and electrifying performances with a 30-piece orchestra under the stars.",
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
    title: "Sunburn Festival 2026",
    description: "Asia's biggest electronic dance music festival returns with world-class DJs, stunning visuals, and three days of non-stop beats. Multiple stages, immersive sound experiences, and a vibrant community of EDM lovers. Dance till dawn!",
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
    title: "Prateek Kuhad — The Way That Lovers Do",
    description: "Indie music sensation Prateek Kuhad performs an intimate acoustic evening. Known for his Grammy-nominated album and heartfelt lyrics, Prateek creates a cozy, magical atmosphere filled with love songs and whispered melodies.",
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

const seedDB = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Event.deleteMany({});
    await User.deleteMany({});

    console.log('Cleared existing data');

    // Insert events
    const insertedEvents = await Event.insertMany(events);
    console.log(`Inserted ${insertedEvents.length} events`);

    // Create a demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@ticketshield.com',
      password: 'demo1234'
    });
    console.log(`Created demo user: ${demoUser.email}`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
