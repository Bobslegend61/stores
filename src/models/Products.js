const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const ProductsSchema = new mongoose.Schema({
    inStock: {
        type: Number,
        default: 0
    }, 
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    }
});

ProductsSchema.plugin(timestamp);

module.exports = mongoose.model('Product', ProductsSchema);

