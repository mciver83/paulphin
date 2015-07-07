var Customer = require('../models/CustomerModel.js');

module.exports = {

	create: function(req, res){

		Customer.findByIdAndUpdate(req.params.customerId, 
			{ $push: { 'address': req.body }},
			{ safe: true, upsert: true},
			function(err, data){
				if(err){
					return res.status(500).send(err)
				} else {
					return res.send(data)
				}
			}
		)
		// Customer.findByIdAndUpdate(req.params.customerId, 
		// 	{ $push: { 'address': req.body }},
		// 	{ safe: true, upsert: true},
		// 	function(err, data){
		// 		if(err){
		// 			return res.status(500).send(err)
		// 		} else {
		// 			return res.send(data)
		// 		}
		// 	}
		// )
	},

	update: function(req, res){
		Customer.findByIdAndUpdate(req.query.id, req.body, function(err, data){
			if(err){
				res.error(500).send('you need to enter the customer id');
			} else {
				res.send(data);
			}
		})
	},

	delete: function(req, res){
  		Customer.findByIdAndUpdate(req.params.customerId,
   			{ $pull: { 'address': {  _id: req.params.addressId } } },
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
