const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/portfolio-messages', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

// POST endpoint
app.post('/contact', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).send('Message saved!');
  } catch (error) {
    res.status(500).send('Error saving message');
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
