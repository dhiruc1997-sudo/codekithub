import ProductCard from "../components/ProductCard";
import HeroSection from "../components/HeroSection";

// const dummyProducts = [
//   { 
//     id: 1, 
//     title: "Next.js Admin Panel", 
//     description: "Full-featured dashboard with authentication, data visualization, and CRUD operations", 
//     price: 499,
//     category: "Templates",
//     image: "/admin-panel.jpg",
//     rating: 4.9,
//     sales: 128
//   },
//   { 
//     id: 2, 
//     title: "Portfolio Template", 
//     description: "Responsive developer portfolio with dark mode and project showcase", 
//     price: 199,
//     category: "Templates",
//     image: "/portfolio-template.jpg",
//     rating: 4.7,
//     sales: 86
//   },
// ];

export default function Home() {
  
  return (
    <div>
      <HeroSection />
      
      {/* Earnings Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Your Developer Earnings</h3>
              <p className="mt-1 text-2xl font-bold text-purple-600">₹1,284.50</p>
              <p className="mt-2 text-sm text-gray-500">From 23 sales this month</p>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-md hover:from-purple-700 hover:to-pink-700 transition-all">
              Withdraw Earnings
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-200 sm:text-4xl">
            Popular Developer Products
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-200 mx-auto">
            Carefully crafted solutions for your development needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard/>
        </div>
      </div>
    </div>
  );
}