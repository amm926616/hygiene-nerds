import { motion } from "framer-motion";
import { BiLeaf } from "react-icons/bi";
import { BsShieldCheck } from "react-icons/bs";
import { GiSparkles } from "react-icons/gi";
import { LuHeartHandshake } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Story</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Where passion for cleanliness meets compassionate service
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              More Than Just Products -{" "}
              <span className="text-blue-600">A Commitment</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At{" "}
              <span className="font-semibold text-blue-600">Hygiene Nerds</span>
              , we don't just sell hygiene products - we cultivate relationships
              built on trust and care. What began as a simple passion for
              helping people stay healthy has grown into a mission to make
              premium hygiene accessible to all.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every product in our collection is personally vetted by our team.
              We test for quality, efficacy, and environmental impact because we
              believe you deserve nothing less than the best for your wellbeing.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full text-lg font-medium transition-all shadow-lg"
            >
              Discover Our Products
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
          >
            <img
              src="/about-team.jpg"
              alt="Hygiene Nerds team"
              className="rounded-xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: <BiLeaf size={40} className="text-green-500 mb-4" />,
              title: "Eco-Conscious",
              description:
                "Sustainable options that care for you and the planet",
            },
            {
              icon: (
                <LuHeartHandshake size={40} className="text-pink-500 mb-4" />
              ),
              title: "Customer First",
              description: "Your satisfaction is our top priority",
            },
            {
              icon: <BsShieldCheck size={40} className="text-blue-500 mb-4" />,
              title: "Quality Guaranteed",
              description: "Rigorously tested for safety and effectiveness",
            },
            {
              icon: <GiSparkles size={40} className="text-yellow-500 mb-4" />,
              title: "Innovative Solutions",
              description: "Always seeking better ways to serve you",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Join Our Hygiene Revolution
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We're more than a store - we're a community passionate about health
            and happiness. Let's build a cleaner, healthier world together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/products/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-full font-medium transition-all"
            >
              Shop Now
            </motion.a>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 py-3 px-6 rounded-full font-medium transition-all"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
