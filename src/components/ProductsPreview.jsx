import React, { useState, useEffect } from "react";
import { ProductsPreviewCard } from "./ProductPreviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../stores/cart/cartSlice";

export const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => {
        // Limit to 9 products
        const limitedProducts = data?.data?.slice(0, 9) || [];
        setProducts(limitedProducts);
      })
      .catch((e) => console.log(e));
  }, []);

  const onAddProduct = (product) => {
    dispatch(addToCart(product));
  };

  const CustomButtonGroup = ({ next, previous }) => (
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <button
        onClick={previous}
        className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all duration-300 backdrop-blur-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );

  const CustomDot = ({ onClick, ...rest }) => {
    const { active } = rest;
    return (
      <button
        className={`${
          active ? "w-8 bg-yellow-400" : "w-3 bg-gray-400"
        } h-3 mx-1 rounded-full transition-all duration-300 hover:bg-yellow-500`}
        onClick={onClick}
      />
    );
  };

  return (
    <div className="w-full py-16 px-4 md:px-8 lg:px-16 bg-neutral-950">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Featured <span className="text-yellow-400">Dishes</span>
        </h2>
        <div className="relative">
          <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all 500ms ease"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style flex justify-center gap-1 mt-6"
            showDots={true}
            customDot={<CustomDot />}
            arrows={false}
            customButtonGroup={<CustomButtonGroup />}
            renderButtonGroupOutside={true}
            className="py-4"
          >
            {products.map((product, index) => (
              <div key={index} className="px-4">
                <ProductsPreviewCard
                  product={product}
                  onAddProduct={onAddProduct}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};
