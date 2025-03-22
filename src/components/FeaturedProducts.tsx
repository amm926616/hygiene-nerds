export interface Feature {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function FeaturedProducts() {
  const featuredProducts: Feature[] = [
    {
      id: 1,
      name: "Hand Sanitizer",
      description:
        "Keep your hands clean and germ-free with our highly effective hand sanitizer. Made with 70% alcohol and aloe vera for a gentle touch.",
      price: 5.99,
      imageUrl: "https://placehold.co/800x400", // Wider image
    },
    {
      id: 2,
      name: "Face Masks",
      description:
        "Stay safe and comfortable with our breathable, reusable face masks. Perfect for daily use and available in multiple sizes.",
      price: 10.99,
      imageUrl: "https://placehold.co/800x400", // Wider image
    },
    {
      id: 3,
      name: "Disinfectant Wipes",
      description:
        "Quickly disinfect surfaces with our multi-surface wipes. Ideal for home, office, or on-the-go use.",
      price: 7.99,
      imageUrl: "https://placehold.co/800x400", // Wider image
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-700 mb-12 text-center">
          Featured Products
        </h2>
        <div className="space-y-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row"
            >
              {/* Product Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <h3 className="text-3xl font-semibold text-blue-700 mb-4">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
