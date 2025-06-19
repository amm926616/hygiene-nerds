import { motion } from "framer-motion";
import { Mail, Phone, MapPin, HeartHandshake, Briefcase } from "lucide-react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "react-feather";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's <span className="text-blue-600">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you have questions, partnership ideas, or want to join our
            community - we'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Email Us</h3>
                    <a
                      href="mailto:hello@hygienerds.com"
                      className="text-blue-600 hover:underline"
                    >
                      hello@hygienerds.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Call Us</h3>
                    <a
                      href="tel:+11234567890"
                      className="text-blue-600 hover:underline"
                    >
                      +1 (123) 456-7890
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Mon-Fri, 9am-5pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Hygiene Avenue
                      <br />
                      Clean City, CC 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { icon: <Instagram className="text-pink-600" />, url: "#" },
                  { icon: <Facebook className="text-blue-700" />, url: "#" },
                  { icon: <Twitter className="text-blue-400" />, url: "#" },
                  { icon: <Linkedin className="text-blue-600" />, url: "#" },
                  { icon: <Youtube className="text-red-600" />, url: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ y: -3 }}
                    className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Community */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center space-x-3 mb-3">
                <HeartHandshake className="text-blue-600" size={24} />
                <h3 className="text-xl font-semibold text-gray-800">
                  Join Our Community
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Connect with fellow hygiene enthusiasts in our private Facebook
                group.
              </p>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all"
              >
                Join Now
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-blue-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>General Inquiry</option>
                  <option>Product Question</option>
                  <option>Partnership Opportunity</option>
                  <option>Wholesale Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Vendor Application Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-blue-600 rounded-2xl p-8 text-white"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Briefcase className="text-white" size={28} />
                <h2 className="text-2xl font-bold">Want to Sell With Us?</h2>
              </div>
              <p className="mb-6">
                We're always looking for quality hygiene products to add to our
                collection. Join our network of vendors and reach thousands of
                hygiene-conscious customers.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start space-x-2">
                  <span>✓</span>
                  <span>Competitive commission rates</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>✓</span>
                  <span>Marketing and promotional support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span>✓</span>
                  <span>Fast, reliable payment processing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl text-gray-800">
              <h3 className="text-xl font-semibold mb-4">Vendor Application</h3>
              <form
                className="space-y-4"
                action="https://formspree.io/f/your-form-id"
                method="POST"
              >
                <input
                  type="text"
                  placeholder="Business Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Contact Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Website (if applicable)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Tell us about your products"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                ></textarea>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all"
                >
                  Submit Application
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 bg-white p-8 rounded-2xl shadow-md border border-blue-100 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for product updates, hygiene tips, and
            exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all whitespace-nowrap"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
