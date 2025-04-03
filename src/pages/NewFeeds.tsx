import {
  FaHandsWash,
  FaSoap,
  FaViruses,
  FaClinicMedical,
} from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";

export function HygieneLetterFeed() {
  // Sample posts data
  const posts = [
    {
      id: 1,
      title: "The Science of Hand Hygiene",
      content:
        "Recent studies show that proper handwashing can reduce diarrheal diseases by 40% and respiratory infections by 20%. The WHO recommends washing for at least 20 seconds, covering all surfaces of the hands. Our new antimicrobial soap formula has been proven to eliminate 99.9% of common bacteria.",
      icon: <FaHandsWash className="text-blue-600" />,
      date: "June 15, 2023",
      author: "Dr. Sarah Chen",
      category: "Research Update",
    },
    {
      id: 2,
      title: "Eco-Friendly Cleaning Solutions",
      content:
        "We're proud to introduce our new line of plant-based cleaning products. These biodegradable formulas are just as effective as traditional cleaners but without the environmental impact. Early testing shows they remove 98% of surface germs while being safe for septic systems and aquatic life.",
      icon: <GiWaterDrop className="text-green-600" />,
      date: "June 10, 2023",
      author: "Environmental Health Team",
      category: "Product Launch",
    },
    {
      id: 3,
      title: "Summer Hygiene Alert",
      content:
        "With temperatures rising, we're seeing increased cases of heat-related illnesses. Remember to stay hydrated and wash more frequently in hot weather. Public health officials recommend showering after sweating and changing clothes daily to prevent bacterial growth. Our new cooling body wash is specially formulated for summer use.",
      icon: <FaSoap className="text-red-600" />,
      date: "June 5, 2023",
      author: "Public Health Advisory",
      category: "Seasonal Tips",
    },
    {
      id: 4,
      title: "Antibiotic Resistance Update",
      content:
        "The CDC reports concerning trends in antibiotic-resistant infections. Proper hygiene remains our first line of defense. Simple actions like regular handwashing and surface disinfection can dramatically reduce transmission. Our lab has identified three new high-touch surfaces that often get missed during cleaning routines.",
      icon: <FaViruses className="text-purple-600" />,
      date: "May 28, 2023",
      author: "Medical Research Division",
      category: "Health Advisory",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-100 pb-4">
            <FaClinicMedical className="inline mr-3 text-blue-500" />
            Hygiene Bulletin
          </h1>
          <p className="mt-2 text-gray-600">
            Trusted updates for health-conscious living
          </p>
        </div>
      </div>

      {/* Posts Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Posts */}
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden mb-10 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    {post.icon}
                  </div>
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">
                      {post.category}
                    </span>
                    <span className="block text-gray-500 text-sm mt-1">
                      {post.date}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">By {post.author}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {post.title}
              </h2>

              <div className="prose max-w-none text-gray-700 mb-6">
                <p>{post.content}</p>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                  Read full report
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                  <button className="text-gray-500 hover:text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 my-12 border border-blue-200">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Stay Informed
            </h3>
            <p className="text-gray-600 mb-6">
              Get our weekly hygiene bulletins directly to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We never share your information. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
