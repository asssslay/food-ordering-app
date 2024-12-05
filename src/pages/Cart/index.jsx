import { Tabs } from "../../components/Tabs";
import Button from "../../components/elements/Button";
import { useSelector } from "react-redux";
import { cartProducts } from "../../stores/cart/cartSlice";
import useTabSwitch from "../../hooks/useTabSwitch";
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg";
import { AddressForm } from "../../components/AddressForm";
import { ProductsSummary } from "../../components/ProductsSummary";
import { Link } from "react-router-dom";
import { ReactComponent as CartIcon } from "../../assets/icons/cart.svg";
import PaymentForm from "../../components/PaymentForm";

const Cart = () => {
    const cart = useSelector(cartProducts);
    const tabs= ['Summary', 'Delivery', 'Payment'];
    const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

    if (!cart || cart.length === 0) {
        return (
            <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 text-center">
                <div className="w-24 h-24 mb-6 text-gray-400">
                    <CartIcon className="w-full h-full" />
                </div>
                <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Link 
                    to="/" 
                    className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors duration-300 inline-flex items-center"
                >
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-white min-h-screen text-black mx-auto mt-2 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
            <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
            <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
                <ProductsSummary />
                <div className="flex justify-end p-2">
                    <Button variant="dark" className="flex items-center" onClick={()=>handleTabSwitch('Delivery')}>
                        <span className="mr-1">Next</span>
                        <ArrowRightSvg />
                    </Button>
                </div>
            </div>
            <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
                <AddressForm onTabSwitch={handleTabSwitch}/>
            </div>
            <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
                <PaymentForm />
            </div>
        </div>
    )
}

export default Cart;