var mongoose = require('mongoose'),
	Customer = require('../models/CustomerModel.js'),
	Product = require('../models/ProductModel.js'),
	address = require('../models/AddressModel.js');

var OrderSchema = new mongoose.Schema({
	customer: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
	products: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		price: { type: Number, min: 1, max: 100000, required: true },
		quantity: { type: Number, required: true, min: 1, max: 99 }
	}],
	totalCost: {type: Number, required: true },
	address: address,
	payment: {
		status: { type: String, enum: ['waiting', 'processing', 'paid'], default: 'waiting' },
		confirmation: { type: String }
	},
	status: { type: String, enum: ['processing', 'shipping', 'on hold', 'delivered'], default: 'processing'}
});

module.exports = mongoose.model('Order', OrderSchema);