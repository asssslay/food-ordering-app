import aboutImage from "../assets/images/about-image.png";

export const About = () => {
  return (
    <div className="bg-white" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                About Us
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
                beatae! Doloribus fuga aperiam magni ipsum repellat voluptates
                itaque error, atque, exercitationem fugit ab, modi ut voluptatum
                sequi ad eum! Rerum! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Minus quia suscipit deserunt, neque nemo veniam
                adipisci deleniti culpa dolor dolores omnis, rem veritatis assumenda
                eaque dignissimos ut, nam debitis numquam!
              </p>
            </div>
            <div className="order-1 md:order-2 flex items-center justify-center">
              <img
                src={aboutImage}
                alt="about-image"
                className="w-full max-w-[300px] sm:max-w-[400px] h-auto rounded-lg shadow-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;