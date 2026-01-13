const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Private
exports.getProducts = async (req, res) => {
    try {
        const { isPublished } = req.query;
        let query = {};
        if (isPublished !== undefined) {
            query.isPublished = isPublished === 'true';
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
    try {
        // req.body contains text fields
        // req.files contains uploaded files array if any

        const {
            name,
            type,
            stock,
            mrp,
            sellingPrice,
            brand,
            exchangeEligible,
            isPublished
        } = req.body;

        let images = [];
        if (req.files) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }

        const product = await Product.create({
            name,
            type,
            stock: Number(stock),
            mrp: Number(mrp),
            sellingPrice: Number(sellingPrice),
            brand,
            images,
            exchangeEligible: exchangeEligible === 'true' || exchangeEligible === true, // Handle string from formdata
            isPublished: isPublished === undefined ? true : (isPublished === 'true' || isPublished === true)
        });

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const {
            name,
            type,
            stock,
            mrp,
            sellingPrice,
            brand,
            exchangeEligible,
            isPublished
        } = req.body;

        // Update fields
        product.name = name || product.name;
        product.type = type || product.type;
        product.stock = stock !== undefined ? Number(stock) : product.stock;
        product.mrp = mrp !== undefined ? Number(mrp) : product.mrp;
        product.sellingPrice = sellingPrice !== undefined ? Number(sellingPrice) : product.sellingPrice;
        product.brand = brand || product.brand;
        product.exchangeEligible = exchangeEligible !== undefined ? (exchangeEligible === 'true' || exchangeEligible === true) : product.exchangeEligible;
        product.isPublished = isPublished !== undefined ? (isPublished === 'true' || isPublished === true) : product.isPublished;

        // Handle new images if uploaded
        if (req.files && req.files.length > 0) {
            const newImages = req.files.map(file => `/uploads/${file.filename}`);
            product.images = [...product.images, ...newImages];
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
