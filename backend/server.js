const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/mayank_portfolio';

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static frontend files (Adjusted path)
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve certificates folder statically
const certDir = path.join(__dirname, 'certificates');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}
app.use('/certificates', express.static(certDir));

// Routes
const contactRoutes = require('./routes/contact');
const certificateRoutes = require('./routes/certificates');

app.use('/api/contact', contactRoutes);
app.use('/api/certificates', certificateRoutes);

// Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Successfully connected to MongoDB.');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
