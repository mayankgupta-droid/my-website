const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Certificate = require('../models/Certificate');

const certDir = path.join(__dirname, '../certificates');

// Automatically scan certificates folder and update MongoDB
async function scanCertificates() {
  try {
    const files = fs.readdirSync(certDir);
    for (const file of files) {
      if (['.pdf', '.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())) {
        const exists = await Certificate.findOne({ fileName: file });
        if (!exists) {
          await new Certificate({
            fileName: file,
            displayName: file.split('.').slice(0, -1).join('.')
          }).save();
        }
      }
    }
  } catch (err) {
    console.error('Error scanning certificates folder:', err);
  }
}

router.get('/', async (req, res) => {
  try {
    await scanCertificates();
    const certificates = await Certificate.find().sort({ scannedAt: -1 });
    res.status(200).json(certificates);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching certificates' });
  }
});

module.exports = router;
