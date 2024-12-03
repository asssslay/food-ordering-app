import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/productsSlice";
// import addressReducer from "./userInfo/addressSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
});

export default rootReducer;
