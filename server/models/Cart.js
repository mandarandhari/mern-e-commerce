const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cart_id: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: false,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('cart', CartSchema);