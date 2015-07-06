var mongoose = require('mongoose'),
	Product = require('../models/ProductModel.js'),
	Order = require('../models/OrderModel.js'),
	address = require('../models/AddressModel.js');

var CustomerSchema = mongoose.Schema({
	name: { type: String, required: true },
	email: [{type: String, unique: true, required: true}],
	phone: { type: String },
	address: [address],
	cart: [{
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		price: { type: Number, min: 0},
		quantity: {  type: Number, min: 1, default: 1 }
	}],
	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Customer', CustomerSchema);