import { AddProduct } from "./AddProduct";

export const ProductsPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm p-4 transition-all duration-300 hover:bg-black/40 hover:shadow-xl">
      <div className="aspect-square overflow-hidden rounded-lg mb-4">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white truncate">{product.name}</h2>
        <p className="text-gray-300 text-sm line-clamp-2 min-h-[2.5rem]">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-yellow-400 font-bold text-lg">${product.price}</span>
          <div className="transform transition-all duration-300 hover:scale-110">
            <AddProduct onAddProduct={addProduct} />
          </div>
        </div>
      </div>
    </div>
  );
};
