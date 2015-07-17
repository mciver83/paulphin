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
		console.log(33333, req.session.cart[0])
		for(var i = 0; i < req.session.cart.length; i++){
			if(req.session.cart[i].item.id === req.body.id){
				req.session.cart[i].quantity = req.body.quantity;
				break;
			}
		}
		res.send(req.session.cart)
	},

	deleteItem: function(req, res){
		console.log(req.body)
		for(var i = 0; i < req.session.cart.length; i++){
			if(req.session.cart[i].item.id === req.body.id){
				req.session.cart.splice(i, 1);
				break;
			}
		}
		res.send(req.session.cart)
	}
	
}