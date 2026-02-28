const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
