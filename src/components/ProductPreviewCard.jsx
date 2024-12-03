import { AddProduct } from "./AddProduct";

export const ProductsPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="w-full p-4 m-2 rounded text-white bg-gradient-to-b from-slate-600 to-transparent text-center">
      <img src={product.imageUrls} alt={product.name} />
      <h2 className="pb-2 text-lg">{product.name}</h2>
      <p className="mb-2 h-20 line-clamp-4">{product.description}</p>
      <AddProduct onAddProduct={addProduct} />
    </div>
  );
};
