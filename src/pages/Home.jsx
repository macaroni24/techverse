import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-32 bg-gray-900 text-white min-h-screen">

      {/* Hero Section */}
      <section className="text-center px-6 py-16 bg-gray-900">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to <span className="text-indigo-500">Techverse</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          Discover the latest tech products all in one place. Explore, compare, and shop with ease.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
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
            className="rounded-lg shadow-lg max-w-full mx-auto"
          />
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="px-6 py-16 bg-gray-800">
        <h2 className="text-4xl font-bold mb-10 text-center text-indigo-400">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1606813904280-c0b174f2f2f2?auto=format&fit=crop&w=400&q=80"
              alt="Product 1"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="font-semibold text-lg mb-2">Gaming Laptop</h3>
            <p className="text-indigo-300 font-bold mb-2">$1299</p>
            <Link
              to="/products"
              className="block bg-indigo-500 hover:bg-indigo-600 text-center py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1611599530491-1f6119ef51e8?auto=format&fit=crop&w=400&q=80"
              alt="Product 2"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="font-semibold text-lg mb-2">Wireless Headphones</h3>
            <p className="text-indigo-300 font-bold mb-2">$299</p>
            <Link
              to="/products"
              className="block bg-indigo-500 hover:bg-indigo-600 text-center py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1612831455546-5ee7c98261b7?auto=format&fit=crop&w=400&q=80"
              alt="Product 3"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="font-semibold text-lg mb-2">Smartphone</h3>
            <p className="text-indigo-300 font-bold mb-2">$899</p>
            <Link
              to="/products"
              className="block bg-indigo-500 hover:bg-indigo-600 text-center py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg hover:scale-105 transform transition">
            <img
              src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=400&q=80"
              alt="Product 4"
              className="rounded-lg mb-4 w-full h-48 object-cover"
            />
            <h3 className="font-semibold text-lg mb-2">Smartwatch</h3>
            <p className="text-indigo-300 font-bold mb-2">$199</p>
            <Link
              to="/products"
              className="block bg-indigo-500 hover:bg-indigo-600 text-center py-2 rounded-lg transition"
            >
              View Details
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 py-16 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold mb-12 text-indigo-400">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "Techverse has the best products at amazing prices! I love shopping here."
            </p>
            <h3 className="font-semibold text-indigo-300">John Doe</h3>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "The site is so easy to navigate and the product selection is fantastic."
            </p>
            <h3 className="font-semibold text-indigo-300">Jane Smith</h3>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p className="text-gray-300 mb-4">
              "Fast delivery and great customer support. Highly recommended!"
            </p>
            <h3 className="font-semibold text-indigo-300">Alex Johnson</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
