var mongoose = require('mongoose');
var Product = require('../models/ProductModel.js');

var Cart = mongoose.Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
	quantity: {  type: Number, min: 1, default: 1 }
})