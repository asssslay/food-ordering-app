const express = require('express')
const router = express.Router()
const User = require('../models/userModel')

router.post('/create-user', async (req, res) => {
    try {
        console.log('Received create user request:', req.body);
        const { name, email, _id } = req.body;
        
        // Validate required fields
        if (!name || !email || !_id) {
            console.log('Missing required fields:', { name, email, _id });
            return res.status(400).json({ 
                error: "Missing required fields" 
            });
        }

        const user = new User({
            name,
            email,
            _id
        });

        console.log('Attempting to save user:', user);
        const savedUser = await user.save();
        console.log('Successfully saved user:', savedUser);
        res.status(200).json({ data: savedUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({ 
            error: error.message || "Error creating user" 
        });
    }
});

module.exports = router