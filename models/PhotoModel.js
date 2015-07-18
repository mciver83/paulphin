var mongoose = require('mongoose');

var PhotoSchema = mongoose.Schema({

	title: { type: String, maxlength: 40 },
	description: { type: String, maxlength: 100 },
	imageUrl: {type: String, required: true },
	category: { type: String},
	auth: { type: String, required: true, default: 'website' }, //maybe name this property excersion??  
	dateCreated: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Photo', PhotoSchema)