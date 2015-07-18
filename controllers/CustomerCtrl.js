var Customer = require('../models/CustomerModel.js')

module.exports = {

	create: function(req, res){
		var newCustomer = new Customer();
		newCustomer.name = req.body.name;
		newCustomer.local.email = req.body.local.email;
		newCustomer.local.password = newCustomer.generateHash(req.body.local.password);
		newCustomer.admin = req.body.admin;
		newCustomer.save(function(err, data) {
            if (err){
                throw err;
            } else {
				res.send(data);
			}
        });

		// new Customer(req.body)
		// .save(function(err, data){
		// 	if(err){
		// 		res.status(500).send(err);
		// 	} else {
		// 		res.send(data)
		// 	}
		// })
	},

	get: function(req, res){
		Customer.find(req.query)
		.populate('cart.product')
		.exec(function(err, data){
			if(err){
				res.error(500).send(err);
			} else {
				res.send(data);
			}
		})
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
		Customer.findByIdAndRemove(req.query.id)
		.exec(function(err, data){
			if(err){
				res.error(500).send('you need to enter customer id')
			} else {
				res.send(data)
			}
		})
	},
}