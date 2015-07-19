var mongoose = require('mongoose'),
	Product = require('../models/ProductModel.js'),
	Order = require('../models/OrderModel.js'),
	address = require('../models/AddressModel.js'),
	bcrypt = require('bcrypt-nodejs');

// var CustomerSchema = mongoose.Schema({
// 	name: { type: String, required: true },
// 	local: {
//         email: { type: String, required: true },
//         password: { type: String, required: true}
//     },
// 	phone: { type: String },
// 	address: [address],
// 	cart: [{
// 		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
// 		price: { type: Number, min: 0},
// 		quantity: {  type: Number, min: 1, default: 1 }
// 	}],
// 	orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
// 	createdAt: { type: Date, default: Date.now },
// 	updatedAt: { type: Date, default: Date.now },
// 	admin: { type: Boolean, default: false }
// })

var CustomerSchema = mongoose.Schema({
	name: { type: String, required: true },
	local: {
        email: { type: String, required: true },
        password: { type: String, required: true}
    },
	
	createdAt: { type: Date, default: Date.now },
	admin: { type: Boolean, default: false }
})

CustomerSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
CustomerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Customer', CustomerSchema);