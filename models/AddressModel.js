module.exports = {
	name: { type: String },
	address: { type: String, required: true },
	address2: { type: String },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: Number, required: true }
}