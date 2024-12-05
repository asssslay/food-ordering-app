import { useDispatch } from "react-redux";
import {incrementProductAmount, decrementProductAmount } from "../stores/cart/cartSlice";

export const ProductsSummaryCard = ({ product }) => {
    const dispatch = useDispatch();

    // Calculate total price for this product
    const totalPrice = (product.price * product.amount).toFixed(2);

    return (
        <div className="flex p-1 sm:p-2 border-b border-b-gray-200">
            <div className="product-image mr-2 border border-grey-200 rounded-lg w-56 h-56 flex-shrink-0">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="product-info flex-grow min-w-0">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                <p className="text-gray-500 text-sm mt-1">Price per item: ${product.price}</p>
            </div>
            <div className="product-price-qt flex flex-col items-center justify-center ml-4 flex-shrink-0">
                <div className="price font-semibold text-lg">${totalPrice}</div>
                <div className="quantity flex items-center mt-2">
                    <button 
                        className="p-1 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200" 
                        disabled={product.amount <= 0} 
                        onClick={() => dispatch(decrementProductAmount(product))}
                    >
                        -
                    </button>
                    <span className="p-1 mx-2 min-w-[20px] text-center">{product.amount}</span>
                    <button 
                        className="p-1 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200"
                        onClick={() => dispatch(incrementProductAmount(product))}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}