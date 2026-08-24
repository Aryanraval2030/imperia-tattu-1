import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import Tattoo from "../models/Tattoo.js";
import Testimonial from "../models/Testimonial.js";

dotenv.config();

const tattoos = [
  {
    id: 1,
    title: "Shaded Forearm Piece",
    category: "Black & Grey",
    image:
      "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Portrait Study",
    category: "Realism",
    image:
      "https://images.unsplash.com/photo-1600456029456-c4b53813915e?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Eagle & Banner",
    category: "Traditional",
    image:
      "https://images.unsplash.com/photo-1540174053853-1cc5d1fa8814?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Botanical Line Work",
    category: "Minimal",
    image:
      "https://images.unsplash.com/photo-1629811002708-7d15c6c7e7a0?q=80&w=414&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Drmat&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Koi & Waves",
    category: "Japanese",
    image:
      "https://images.unsplash.com/photo-1775135287739-1ce11fd0b6d1?q=80&w=436&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 6,
    title: "Single Needle Symbol",
    category: "Minimal",
    image:
      "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 7,
    title: "Skull & Roses Sleeve",
    category: "Black & Grey",
    image:
      "https://images.unsplash.com/photo-1501939387519-cf9c35d4f4eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc5fHx8ZW58MHx8fHx8",
  },
  {
    id: 8,
    title: "Dragon Back Piece",
    category: "Japanese",
    image:
      "https://images.unsplash.com/photo-1640202352521-66c98a02e612?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
  },
  {
    id: 9,
    title: "Lion Chest Artwork",
    category: "Realism",
    image:
      "https://images.unsplash.com/photo-1714787283995-7817fef1becf?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 10,
    title: "Phoenix Rising",
    category: "Traditional",
    image:
      "https://plus.unsplash.com/premium_photo-1745177740058-efed6a96a7d9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 11,
    title: "Floral Wrist Design",
    category: "Fine Line",
    image:
      "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 12,
    title: "Geometric Mountain",
    category: "Fine Line",
    image:
      "https://images.unsplash.com/photo-1759247943094-38c725526a5d?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Rehan spent the first session just sketching before a single line went on my arm. Worth every extra week.",
    name: "Ananya Shah",
    detail: "Realism sleeve, 2 sessions",
  },
  {
    id: 2,
    quote:
      "The studio itself made the decision easy — spotless, calm, and nobody rushed me into a design I wasn't sure about.",
    name: "Devraj Singh",
    detail: "Traditional back piece",
  },
  {
    id: 3,
    quote:
      "My fine line piece healed better than any tattoo I've had elsewhere. The aftercare follow-up made the difference.",
    name: "Meher Kapoor",
    detail: "Fine line, forearm",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing data...");
    await Admin.deleteMany();
    await Tattoo.deleteMany();
    await Testimonial.deleteMany();

    console.log("Seeding data...");

    // Create Admin
    const admin = new Admin({
      username: "admin",
      password: "admin123", // Will be hashed by pre-save hook
    });
    await admin.save();
    console.log("Admin created: admin / admin123");

    // Create Tattoos
    await Tattoo.insertMany(tattoos);
    console.log("Tattoos seeded");

    // Create Testimonials
    await Testimonial.insertMany(testimonials);
    console.log("Testimonials seeded");

    console.log("Data seeding completed successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();