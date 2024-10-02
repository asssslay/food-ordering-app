export const Banner = () => {
  return (
    <div className="banner w-full md:w-2/3 px-7 mx-auto relative flex items-center justify-between">
      <div className="banner-description w-full md:w-1/2 p-3">
        <h2 className="mb-6 text-4xl font-bold text-white">
          Food Ordering Made Easy
        </h2>
        <p className="font-semibold text-lg text-red-600 py-2">
          Get Started Today!
        </p>
      </div>
      <div className="banner-image w-full md:w-1/2 p-3">
        <img
          src={require("../assets/images/pizza_banner.png")}
          alt="banner"
          className="max-h-96"
        />
      </div>
    </div>
  );
};
