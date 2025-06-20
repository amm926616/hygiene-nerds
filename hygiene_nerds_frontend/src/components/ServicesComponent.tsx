export default function ServicesComponent() {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Premium</span> Services
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-700">
              At{" "}
              <span className="font-semibold text-blue-600">Hygiene Nerds</span>
              , we don't just sell products—we deliver exceptional experiences
              with services designed for your convenience and peace of mind.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Delivery */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Free Delivery
            </h3>
            <p className="text-gray-700 mb-4">
              Enjoy <strong className="text-blue-600">free delivery</strong> on
              all orders over $50. Fast, reliable shipping straight to your
              door.
            </p>
            <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              No minimum weight
            </span>
          </div>

          {/* Hygiene Packages */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Custom Packages
            </h3>
            <p className="text-gray-700 mb-4">
              Personalized hygiene bundles for travel, family care, or personal
              essentials—
              <strong className="text-indigo-600">tailored just for you</strong>
              .
            </p>
            <span className="inline-block bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
              Save up to 20%
            </span>
          </div>

          {/* Subscription Service */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Smart Subscriptions
            </h3>
            <p className="text-gray-700 mb-4">
              Never run out of essentials!{" "}
              <strong className="text-purple-600">Subscribe and save</strong>{" "}
              with automatic monthly deliveries at discounted prices.
            </p>
            <span className="inline-block bg-purple-50 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">
              Pause or cancel anytime
            </span>
          </div>

          {/* Bulk & Wholesale Orders */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Bulk & Wholesale
            </h3>
            <p className="text-gray-700 mb-4">
              Special pricing for businesses and organizations.{" "}
              <strong className="text-amber-600">Volume discounts</strong> on
              large hygiene product orders.
            </p>
            <span className="inline-block bg-amber-50 text-amber-700 text-sm font-medium px-3 py-1 rounded-full">
              Free consultation
            </span>
          </div>

          {/* 24/7 Customer Support */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-700 mb-4">
              Real humans available{" "}
              <strong className="text-green-600">around the clock</strong> to
              assist with any questions or concerns.
            </p>
            <span className="inline-block bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Average response: 2 min
            </span>
          </div>

          {/* Eco-Friendly Products */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-white/20">
            <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-teal-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Eco Commitment
            </h3>
            <p className="text-gray-700 mb-4">
              Sustainable,{" "}
              <strong className="text-teal-600">planet-friendly</strong> hygiene
              options that deliver results without compromising the environment.
            </p>
            <span className="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-3 py-1 rounded-full">
              Carbon neutral shipping
            </span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/products/"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl"
          >
            Explore All Services
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
