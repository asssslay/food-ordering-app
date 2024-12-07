import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './elements/Button';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, cartProducts } from '../stores/cart/cartSlice';
import { clearAddress, getAddress } from '../stores/userInfo/addressSlice';

export const PaymentForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(cartProducts);
    const address = useSelector(getAddress);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        email: ''
    });
    const [errors, setErrors] = useState({});
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        
        // Validate Card Holder Name (only letters and spaces)
        if (!formData.cardHolder.trim()) {
            newErrors.cardHolder = 'Card holder name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.cardHolder)) {
            newErrors.cardHolder = 'Card holder name should only contain letters';
        }

        // Validate Card Number (16 digits, spaces allowed)
        const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
        if (!cardNumberClean) {
            newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(cardNumberClean)) {
            newErrors.cardNumber = 'Card number must be 16 digits';
        }

        // Validate Expiry Date (MM/YY format)
        if (!formData.expiryDate) {
            newErrors.expiryDate = 'Expiry date is required';
        } else {
            const [month, year] = formData.expiryDate.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            
            if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Invalid format (MM/YY)';
            } else if (parseInt(month) < 1 || parseInt(month) > 12) {
                newErrors.expiryDate = 'Invalid month';
            } else if (parseInt(year) < currentYear || 
                     (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                newErrors.expiryDate = 'Card has expired';
            }
        }

        // Validate CVV (3 digits)
        if (!formData.cvv) {
            newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3}$/.test(formData.cvv)) {
            newErrors.cvv = 'CVV must be 3 digits';
        }

        // Validate email for guest orders
        const userId = localStorage.getItem('User Id');
        if (!userId && !formData.email) {
            newErrors.email = 'Email is required for guest orders';
        } else if (!userId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
            formattedValue = formattedValue.substring(0, 19); // Limit to 16 digits + 3 spaces
        }
        // Format expiry date with slash
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\//g, '');
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
            }
            formattedValue = formattedValue.substring(0, 5); // Limit to MM/YY format
        }
        // Limit CVV to 3 digits
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').substring(0, 3);
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const userId = localStorage.getItem('User Id');

            // Create order
            fetch('http://localhost:8080/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId || 'guest',
                    guestEmail: !userId ? formData.email : undefined,
                    items: cart.map(item => ({
                        name: item.name,
                        quantity: item.amount,
                        price: parseFloat(item.price)
                    })),
                    total: cart.reduce((sum, item) => sum + (parseFloat(item.price) * item.amount), 0),
                    shippingAddress: address
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to create order');
                }
                return response.json();
            })
            .then(() => {
                dispatch(clearCart());
                dispatch(clearAddress());
                
                // Reset form
                setFormData({
                    cardNumber: '',
                    cardHolder: '',
                    expiryDate: '',
                    cvv: '',
                    email: ''
                });

                // Navigate to success page
                navigate('/payment-success');
            })
            .catch(error => {
                console.error('Error creating order:', error);
                alert('Failed to process payment. Please try again.');
            });
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                    <input
                        type="text"
                        id="cardHolder"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.cardHolder ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                        placeholder="John Doe"
                    />
                    {errors.cardHolder && <p className="mt-1 text-sm text-red-500">{errors.cardHolder}</p>}
                </div>

                <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        className={`mt-1 block w-full px-3 py-2 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                    />
                    {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                        />
                        {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                    </div>

                    <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className={`mt-1 block w-full px-3 py-2 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500`}
                        />
                        {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                    </div>
                </div>

                {!localStorage.getItem('User Id') && (
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                            Email for Order Confirmation
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic">{errors.email}</p>
                        )}
                    </div>
                )}

                <div className="mt-6">
                    <Button type="submit" className="w-full">
                        Pay Now
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
