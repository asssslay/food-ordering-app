const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const OrderSchema = new Schema({
    userId: { type: String, required: true },
    guestEmail: { type: String, required: function() { return this.userId === 'guest'; } },
    items: [OrderItemSchema],
    total: { type: Number, required: true },
    status: { 
        type: String, 
        required: true,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        postalCode: { type: String, required: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
