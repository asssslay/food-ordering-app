import Button from "./elements/Button";

export const Banner = () => {
  return (
    <div className="relative min-h-[80vh] bg-black">
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
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] flex items-center">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Food Ordering
            <span className="block">Made Easy</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Delicious food delivered to your doorstep. Fresh, fast, and always fantastic.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Order Now
            </Button>
            <a
              href="/menu"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-black transition-all"
            >
              See Menu
            </a>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-yellow-500 text-xl font-bold mb-2">Fast Delivery</div>
              <p className="text-gray-400">Within 30 minutes</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-500 text-xl font-bold mb-2">Fresh Food</div>
              <p className="text-gray-400">Made with love</p>
            </div>
            <div className="text-center">
              <div className="text-yellow-500 text-xl font-bold mb-2">Free Shipping</div>
              <p className="text-gray-400">On orders over $50</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
