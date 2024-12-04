import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
} from "../../stores/menu/productsSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const productsState = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (productsState && productsState.products) {
      console.log('Menu Component State:', {
        status: productsState.status,
        products: productsState.products,
      });
    }
  }, [productsState]);

  if (!productsState || !productsState.products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-container">
      {productsState.status === "pending" ? (
        <div>Loading...</div>
      ) : (
        <div>
          {productsState.products && productsState.products.map((category, index) => (
              <div key={index} className="category-section">
                <h2 className="category-title">
                  {category.name && typeof category.name === 'object' 
                    ? category.name.value 
                    : category.name || 'Uncategorized'}
                </h2>
                <div className="products-list">
                  {Array.isArray(category.products) && category.products.map((product, productIndex) => (
                    <div key={`${index}-${productIndex}`} className="product-item">
                      {product.name}
                    </div>
                  ))}
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;