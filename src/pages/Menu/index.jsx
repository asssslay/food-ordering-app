import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
} from "../../stores/menu/productsSlice";

const Menu = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div>
      {products.status === "pending" ? (
        <div>Loading...</div>
      ) : (
        <div>
          {Array.isArray(products) &&
            products.map((menuCategory, index) => {
              // return <div key={index}>{product.name}</div>; //bug fix
              return (
                <>
                  <h2>{menuCategory.data.name.name}</h2>
                  <div className="products-list">
                    {menuCategory.data.products.map((product, index) => {
                      return <div>{product.name}</div>;
                    })}
                  </div>
                </>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Menu;