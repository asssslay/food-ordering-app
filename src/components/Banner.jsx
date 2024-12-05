import { Link } from "react-router-dom";

export const Banner = () => {
  return (
    <div className="relative min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh] bg-black">
      {/* Background overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={require("../assets/images/pizza_banner.png")}
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="w-full max-w-xl pt-32 sm:pt-40 md:pt-32 pb-12 md:py-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Food Ordering
              <span className="block">Made Easy</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
              Delicious food delivered to your doorstep. Fresh, fast, and always fantastic.
            </p>
            
            <div className="mb-8 sm:mb-12">
              <Link
                to="/menu"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105"
              >
                See Menu
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-yellow-500 text-lg sm:text-xl font-bold mb-1 sm:mb-2">Fast Delivery</div>
                <p className="text-gray-400 text-sm sm:text-base">Within 30 minutes</p>
              </div>
              <div className="text-center bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-yellow-500 text-lg sm:text-xl font-bold mb-1 sm:mb-2">Fresh Food</div>
                <p className="text-gray-400 text-sm sm:text-base">Made with love</p>
              </div>
              <div className="text-center bg-black/50 p-4 rounded-lg backdrop-blur-sm">
                <div className="text-yellow-500 text-lg sm:text-xl font-bold mb-1 sm:mb-2">Free Shipping</div>
                <p className="text-gray-400 text-sm sm:text-base">On orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
