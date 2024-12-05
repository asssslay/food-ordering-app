import {Tabs} from "../../components/Tabs";
import button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import {cartProducts} from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import {ReactComponent as ArrowRightSvg} from "../../assets/icons/arrow-right-long-svgrepo-com.svg";

const Cart = () => {
  const cart = useSelector(cartProducts);
  const tabs = ['Summary', 'Delivery', 'Payment'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

  if(!cart || cart.length === 0) {
    return ( <div className="bg-white h-full text-black flex justify-center p-4">
      <h1>Your Cart is empty</h1>
    </div> )
  }

  return( <div className="bg-white h-screen text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:-8">
    <Tabs list={tabs} active={currentTab} onTabSwitch={handleTabSwitch} />
  </div> )
};

export default Cart;
