var Customer = require('../models/CustomerModel.js');
var Product = require('../models/ProductModel.js')

module.exports = {

	addProduct: function(req, res){
		req.session.cart.push(req.body)
		res.send(req.session.cart)
	},

	getCart: function(req, res){
		res.send(req.session.cart)
	},

	updateItem: function(req, res){
		for(var i = 0; i < req.session.cart.length; i++){
			if(req.session.cart[i].id === req.body.id){
				req.session.cart[i].quantity = req.body.quantity;
				break;
			}
		}
		res.send(req.session.cart)
	},

	deleteItem: function(req, res){
		console.log(req.body)
		for(var i = 0; i < req.session.cart.length; i++){
			if(req.session.cart[i].id === req.body.id){
				req.session.cart.splice(i, 1);
				break;
			}
		}
		res.send(req.session.cart)
	}
	//use if sessions doesn't work
	// create: function(req, res){
	// 	Customer.findByIdAndUpdate(req.params.customerId, 
	// 		{ $push: { 'cart': req.body }},
	// 		{ safe: true, upsert: true},
	// 		function(err, data){
	// 			if(err){
	// 				return res.status(500).send(err)
	// 			} else {
	// 				return res.send(data)
	// 			}
	// 		}
	// 	)
	// },

	// update: function(req, res){
	// // req.body needs to be in form:
	// // {
	// // 	cart.$.quantity: 'number'
	// // }
	// 	Customer.update( { 'cart._id': req.params.cartItemId },
	// 		{ $set: req.body }, function(err, data){
	// 			if(err){
	// 				return res.status(500).send(err)
	// 			} else {
	// 				return res.send(data)
	// 			}
	// 		})

	// 	// Customer.update( { 'cart._id': req.params.cartItemId },
	// 	// 	{ $set: { 'cart': req.body }},
	// 	// 	function(err, data){
	// 	// 		if(err){
	// 	// 			res.status(500).send(err)
	// 	// 		} else {
	// 	// 			res.send(data)
	// 	// 		}
	// 	// 	})
	// },

	// delete: function(req, res){
 //  		Customer.findByIdAndUpdate(req.params.customerId,
 //   			{ $pull: { 'cart': {  _id: req.params.cartItemId } } },
 //   			function(err, data){
	// 			if(err){
	// 				return res.status(500).send(err)
	// 			} else {
	// 				return res.send(data)
	// 			}
	// 		}
 //    	)
	// }
}