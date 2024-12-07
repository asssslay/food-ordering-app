import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('User Id');

  useEffect(() => {
    // Auto-redirect to orders/home page after 5 seconds
    const timer = setTimeout(() => {
      navigate(userId ? '/orders' : '/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <div className="space-y-4">
          {userId ? (
            <Link
              to="/orders"
              className="block w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              View Your Orders
            </Link>
          ) : (
            <Link
              to="/"
              className="block w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          )}
          <p className="text-sm text-gray-500">
            You will be automatically redirected in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
