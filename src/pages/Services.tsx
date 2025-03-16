export default function Services() {
    return (
        <div className="container mx-auto px-6 py-12 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Services</h2>
            <p className="text-lg text-gray-700 mb-8">
                At <span className="font-semibold text-blue-600">Hygiene Nerds</span>, we go beyond selling hygiene products—we provide exceptional services
                to ensure your convenience, savings, and satisfaction.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Free Delivery */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">🚚 Free Delivery</h3>
                    <p className="text-gray-700">
                        Enjoy **free delivery** on all orders over <strong>$50</strong>. Get your hygiene essentials
                        delivered to your doorstep—fast and hassle-free.
                    </p>
                </div>

                {/* Customized Hygiene Packages */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">🎁 Hygiene Packages</h3>
                    <p className="text-gray-700">
                        Choose from **customized hygiene bundles** tailored to your needs, whether it’s for
                        travel, family care, or personal essentials.
                    </p>
                </div>

                {/* Subscription Service */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">📦 Subscription Service</h3>
                    <p className="text-gray-700">
                        Never run out of your essentials! Subscribe and receive your favorite hygiene
                        products **on a monthly basis** at a discounted price.
                    </p>
                </div>

                {/* Bulk & Wholesale Orders */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">🏢 Bulk & Wholesale</h3>
                    <p className="text-gray-700">
                        Need hygiene products for your business or organization? We offer **special pricing**
                        and bulk discounts for large orders.
                    </p>
                </div>

                {/* 24/7 Customer Support */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">📞 24/7 Customer Support</h3>
                    <p className="text-gray-700">
                        Have a question? Need assistance? Our **customer support team** is available
                        24/7 to help you with any concerns.
                    </p>
                </div>

                {/* Eco-Friendly Products */}
                <div className="bg-white shadow-md rounded-2xl p-6 transition-transform transform hover:scale-105 hover:shadow-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-3">🌿 Eco-Friendly Products</h3>
                    <p className="text-gray-700">
                        We care about the planet! Our hygiene products include **eco-friendly, sustainable**
                        options for a cleaner future.
                    </p>
                </div>
            </div>

            <div className="mt-10">
                <a
                    href="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-medium transition-all"
                >
                    Explore Our Products
                </a>
            </div>
        </div>
    );
}
