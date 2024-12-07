const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Create a new order
router.post('/create-order', async (req, res) => {
    try {
        const { items, total, shippingAddress, guestEmail } = req.body;
        const userId = req.body.userId || 'guest';

        // Validate required fields
        if (!items || !total || !shippingAddress) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        // For guest orders, require an email
        if (userId === 'guest' && !guestEmail) {
            return res.status(400).json({
                error: "Email is required for guest orders"
            });
        }

        const order = new Order({
            userId,
            items,
            total,
            shippingAddress,
            guestEmail: userId === 'guest' ? guestEmail : undefined,
            status: 'Processing'
        });

        const savedOrder = await order.save();
        res.status(200).json({ data: savedOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({
            error: error.message || "Error creating order"
        });
    }
});

// Get orders by user ID
router.get('/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 }); // Sort by newest first
        
        res.status(200).json({ data: orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(400).json({
            error: error.message || "Error fetching orders"
        });
    }
});

// Update order status
router.patch('/orders/:orderId/status', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(200).json({ data: updatedOrder });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(400).json({
            error: error.message || "Error updating order status"
        });
    }
});

module.exports = router;
