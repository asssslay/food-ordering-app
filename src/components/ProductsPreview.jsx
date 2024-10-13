import React, { useState, useEffect } from "react";

export const ProductsPreview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="container mx-auto pb-4 w-2/3 text-white">
      <h2>Products</h2>
    </div>
  );
};
