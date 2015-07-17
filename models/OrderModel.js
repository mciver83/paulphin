var mongoose = require('mongoose'),
	Photo = require('../models/PhotoModel.js'),
	Product = require('../models/ProductModel.js'),
	address = require('../models/AddressModel.js');

var OrderSchema = new mongoose.Schema({
	customer: {
		name: { type: String, required: true },
		email: { type: String, required: true }
	},
	products: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		photo: { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' },
		price: { type: Number, min: 1, max: 100000, required: true },
		quantity: { type: Number, required: true, min: 1, max: 99 }
	}],
	total: {type: Number, required: true },
	address: address,
	payment: {
		status: { type: String, enum: ['waiting', 'processing', 'paid'], default: 'waiting' },
		confirmation: { type: String }
	},
	createdAt: { type: Date, default: Date.now },
	status: { type: String, enum: ['processing', 'shipping', 'on hold', 'delivered'], default: 'processing'}
});

module.exports = mongoose.model('Order', OrderSchema);