var Customer = require('../models/CustomerModel.js');

module.exports = {

	create: function(req, res){
		Customer.findByIdAndUpdate(req.params.customerId, 
			{ $push: { 'cart': req.body }},
			{ safe: true, upsert: true},
			function(err, data){
				if(err){
					return res.status(500).send(err)
				} else {
					return res.send(data)
				}
			}
		)
	},

	update: function(req, res){
	// req.body needs to be in form:
	// {
	// 	cart.$.quantity: 'number'
	// }
		Customer.update( { 'cart._id': req.params.cartItemId },
			{ $set: req.body }, function(err, data){
				if(err){
					return res.status(500).send(err)
				} else {
					return res.send(data)
				}
			})

		// Customer.update( { 'cart._id': req.params.cartItemId },
		// 	{ $set: { 'cart': req.body }},
		// 	function(err, data){
		// 		if(err){
		// 			res.status(500).send(err)
		// 		} else {
		// 			res.send(data)
		// 		}
		// 	})
	},

	delete: function(req, res){
  		Customer.findByIdAndUpdate(req.params.customerId,
   			{ $pull: { 'cart': {  _id: req.params.cartItemId } } },
   			function(err, data){
				if(err){
					return res.status(500).send(err)
				} else {
					return res.send(data)
				}
			}
    	)
	}
}