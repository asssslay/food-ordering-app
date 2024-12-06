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
        cvv: ''
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
            const userId = sessionStorage.getItem('User Id');

            // Create order
            fetch('http://localhost:8080/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
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
                setShowSuccessPopup(true);
                dispatch(clearCart());
                dispatch(clearAddress());
                
                // Reset form
                setFormData({
                    cardNumber: '',
                    cardHolder: '',
                    expiryDate: '',
                    cvv: ''
                });

                // Redirect after 2 seconds
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    navigate('/orders');
                }, 2000);
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

                <div className="mt-6">
                    <Button type="submit" className="w-full">
                        Pay Now
                    </Button>
                </div>
            </form>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-white rounded-lg p-8 text-center">
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h3>
                        <p className="text-gray-600">Thank you for your order.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
