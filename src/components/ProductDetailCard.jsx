import Button from "./elements/Button";

const ProductDetailCard = ({ product, onAddProduct }) => {
    // Get description from either description or desciption field
    const productDescription = product.description || product.desciption || '';
    
    return (
        <div className="p-4 m-4 rounded-lg bg-slate-50">
            <div className="flex flex-col items-center justify-between">
                <h2 className="text-3xl">{product.name}</h2>
                {productDescription && (
                    <p className="text-2xl text-gray-500 mt-2 text-center">
                        {productDescription}
                    </p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <div className="text-3xl text-black">${product.price}</div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center mt-4">
                <img src={product.imageUrl} className="w-40 h-40 rounded-xl object-cover" alt={product.name} />
            </div>
            <div className="w-full flex items-center justify-center mt-4">
                <Button onClick={() => onAddProduct(product)}>Add to Cart</Button>
            </div>
        </div>
    )
}

export default ProductDetailCard;