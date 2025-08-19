export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Digital Products for Developers
        </h1>
        <p className="mt-6 text-xl text-purple-100 max-w-3xl mx-auto">
          High-quality code templates, UI kits, and tools to accelerate your workflow
        </p>
        <div className="mt-10 flex justify-center space-x-4">
          <a
            href="#products"
            className="inline-block bg-white py-3 px-6 border border-transparent rounded-md text-base font-medium text-purple-700 hover:bg-purple-50"
          >
            Browse Products
          </a>
          <a
            href="/upload"
            className="inline-block bg-purple-600 py-3 px-6 border border-transparent rounded-md text-base font-medium text-white hover:bg-purple-700"
          >
            Sell Your Product
          </a>
        </div>
      </div>
    </div>
  );
}