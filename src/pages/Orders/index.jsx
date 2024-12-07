import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Check if user is logged in
                const token = localStorage.getItem('Auth token');
                const userId = localStorage.getItem('User Id');
                
                if (!token || !userId) {
                    navigate('/login');
                    return;
                }

                const response = await fetch(`http://localhost:8080/api/orders/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                setOrders(data.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading orders...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <div className="text-xl text-red-600 mb-4">{error}</div>
                <button 
                    onClick={() => window.location.reload()}
                    className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
                
                {orders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Order #{order._id}</p>
                                        <p className="text-sm text-gray-600">
                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Order Items</h3>
                                    <div className="space-y-3">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-gray-800">{item.name}</span>
                                                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                                </div>
                                                <span className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 mt-4 pt-4">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Address</h3>
                                    <div className="text-gray-600">
                                        <p>{order.shippingAddress.address}</p>
                                        <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                        <p>{order.shippingAddress.country}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
