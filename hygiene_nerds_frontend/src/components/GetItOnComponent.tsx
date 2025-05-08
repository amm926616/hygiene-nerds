import { FaApple, FaGooglePlay, FaMobileAlt } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

export function GetItFrom() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-lg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side - Illustration */}
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 bg-blue-500 rounded-3xl shadow-xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 transform -rotate-3">
                <MdDevices className="text-blue-500 text-7xl" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Take us with you
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Download our mobile app for the best experience on the go.
              Available on both iOS and Android platforms.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
              >
                <FaApple className="mr-3 text-xl" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </a>

              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                <FaGooglePlay className="mr-3 text-xl" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                <FaMobileAlt className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">
                  Scan the QR code with your mobile device
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center lg:justify-start">
              <div className="bg-white p-2 rounded-xl inline-block">
                <img
                  src="qr/hygieneNerdsQr.png"
                  alt="qr code for hygiene nerds"
                  style={{
                    borderRadius: "12px",
                    width: "250px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
