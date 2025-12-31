import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 pt-32">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
        Welcome to <span className="text-indigo-500">Techverse</span>
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mb-8 text-center max-w-xl">
        Discover the latest tech products all in one place. Explore, compare, and shop with ease.
      </p>
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <Link
          to="/products"
          className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Shop Now
        </Link>
        <Link
          to="/about"
          className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
        >
          Learn More
        </Link>
      </div>
      <div className="mt-8">
        <img
          src="https://images.unsplash.com/photo-1581091215369-8b013ebd785c?auto=format&fit=crop&w=800&q=80"
          alt="Tech illustration"
          className="rounded-lg shadow-lg max-w-full"
        />
      </div>
    </div>
  );
}
