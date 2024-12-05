import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './elements/Button';

export const PaymentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        // Format card number with spaces
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        }
        // Format expiry date with slash
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\//g, '');
            if (formattedValue.length > 2) {
                formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: formattedValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSuccessPopup(true);
        
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
            navigate('/');
        }, 2000);
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
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                    />
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
                        maxLength="19"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                        required
                    />
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
                            maxLength="5"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
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
                            maxLength="3"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                            required
                        />
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
                    <div className="relative bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex items-center justify-center mb-4">
                            <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-center text-gray-900 mb-2">Payment Successful!</h3>
                        <p className="text-gray-600 text-center">Thank you for your order.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
