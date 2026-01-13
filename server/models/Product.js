const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., 'Foods', 'Electronics'
    stock: { type: Number, required: true, default: 0 },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    brand: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs/paths
    exchangeEligible: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
