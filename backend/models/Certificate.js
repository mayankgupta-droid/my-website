const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  fileName: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  scannedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
