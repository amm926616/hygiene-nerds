export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl text-center">
      <div>
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">About Us</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Hygiene Nerds</span>,
          your trusted destination for high-quality hygiene products. We believe
          that personal care should be effortless, affordable, and accessible to
          everyone. Our mission is to provide premium hygiene solutions that
          keep you fresh, confident, and protected—every day.
        </p>
        <p className="mt-4 text-gray-700">
          From skincare essentials to sanitization must-haves, we curate only
          the best for you. Your well-being is our top priority, and we’re
          committed to ensuring excellence in every product we offer.
        </p>
        <div className="mt-8">
          <a
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-medium transition-all"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}
