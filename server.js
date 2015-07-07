var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	port = 9003,
	mongoUri = 'mongodb://localhost:27017/paulphin',
	ProductCtrl = require('./controllers/ProductCtrl'),
	CustomerCtrl = require('./controllers/CustomerCtrl'),
	CartCtrl = require('./controllers/CartCtrl'),
	AddressCtrl = require('./controllers/AddressCtrl'),
	EmailCtrl = require('./contorllers/EmailCtrl'),
	OrderCtrl = require('./controllers/OrderCtrl');
	PaymentCtrl = require('controllers/PaymentCtrl')
var stripe = require("stripe")(
  "sk_test_hmNf5aQpZ0J4Lana3HtHlJDR"
);

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongo at ' + mongoUri);
})	

app.use(cors());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'))

// products
app.post('/api/products', ProductCtrl.create);

app.get('/api/products', ProductCtrl.get);

app.put('/api/products', ProductCtrl.update);

app.delete('/api/products', ProductCtrl.delete);

//customer
app.post('/api/customers', CustomerCtrl.create);

app.get('/api/customers', CustomerCtrl.get);

app.put('/api/customers', CustomerCtrl.update);

app.delete('/api/customers', CustomerCtrl.delete);

			//cart
app.post('/api/customers/cart/:customerId', CartCtrl.create);

app.put('/api/customers/cart/:customerId/:cartItemId', CartCtrl.update);

app.delete('/api/customers/cart/:customerId/:cartItemId', CartCtrl.delete);

			//shippind address
app.post('/api/customers/address/:customerId', AddressCtrl.create);

app.put('/api/customers/address/:customerId/:addressId', AddressCtrl.update);

app.delete('/api/customers/address/:customerId/:addressId', AddressCtrl.delete);

//order
app.post('/api/orders', OrderCtrl.create);

app.get('/api/orders', OrderCtrl.get);

app.put('/api/orders', OrderCtrl.update);

//payment with stripe
app.post('/api/orders/:id/payment', PaymentCtrl.submitStripe);

//emails
app.post('/api/email/send', EmailCtrl.sendEmail);
	


app.listen(port, function(){
	console.log('listening on ' + port)
})	