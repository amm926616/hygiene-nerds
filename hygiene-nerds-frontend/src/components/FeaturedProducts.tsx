import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export interface Feature {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  discount?: number; // Added for an extra visual element
}

export default function FeaturedProducts() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const featuredProducts: Feature[] = [
    {
      id: 1,
      name: "Hand Sanitizer",
      description:
        "Keep your hands clean and germ-free with our highly effective formula.",
      price: 5.99,
      discount: 10, // 10% off
      imageUrl: "http://localhost:8080/products/image/hand-sanitizer.jpg",
    },
    {
      id: 2,
      name: "Face Masks",
      description:
        "Breathable, reusable masks with adjustable ear loops for all-day comfort.",
      price: 10.99,
      imageUrl: "http://localhost:8080/products/image/face-masks.jpg",
    },
    {
      id: 3,
      name: "Disinfectant Wipes",
      description: "Kills 99.9% of bacteria and viruses on surfaces.",
      price: 7.99,
      discount: 15, // 15% off
      imageUrl: "http://localhost:8080/products/image/disinfectant-wipes.jpg",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return; // Pause when hovered

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, featuredProducts.length]);

  // Swipe gestures (touch devices)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) nextSlide(); // Swipe left
    if (touchStart - touchEnd < -50) prevSlide(); // Swipe right
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1,
    );
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-16 text-center">
          Featured Products
        </h2>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative h-[500px] md:h-[700px] w-full rounded-3xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              {/* Background Image with Zoom Animation */}
              <div className="absolute inset-0 bg-black/30 z-10"></div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-10000 ease-linear ${index === currentSlide ? "scale-105" : "scale-100"}`}
              />

              {/* Product Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="max-w-2xl mx-auto text-white">
                  {/* Discount Ribbon */}
                  {product.discount && (
                    <span className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full mb-3">
                      {product.discount}% OFF
                    </span>
                  )}

                  <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    {product.name}
                  </h3>
                  <p className="text-lg md:text-xl mb-6 opacity-90">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      {product.discount ? (
                        <>
                          <span className="text-2xl md:text-3xl font-bold text-blue-300 line-through mr-2">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-2xl md:text-3xl font-bold text-white">
                            $
                            {(
                              product.price *
                              (1 - product.discount / 100)
                            ).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl md:text-3xl font-bold text-blue-300">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <Link
                      to="/products"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 inline-block text-center"
                    >
                      Go to Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all transform hover:scale-110"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 backdrop-blur-sm p-3 rounded-full transition-all transform hover:scale-110"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-blue-400 w-6" : "bg-white/50 hover:bg-white/70"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
