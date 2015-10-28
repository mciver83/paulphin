var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	port = process.env.PORT || 9003,
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	AWS = require('aws-sdk'),
	fs = require('fs'),
	multer = require('multer'),
	cookieParser = require('cookie-parser'),
//	 mongoUri = 'mongodb://localhost:27017/paulphin';
	mongoUri = process.env.MONGOLAB_URI;



//controllers
var PaymentCtrl = require('./controllers/PayCtrl'),
	ProductCtrl = require('./controllers/ProductCtrl'),
	PhotoCtrl = require('./controllers/PhotoCtrl'),
	CustomerCtrl = require('./controllers/CustomerCtrl'),
	CartCtrl = require('./controllers/CartCtrl'),
	AddressCtrl = require('./controllers/AddressCtrl'),
	EmailCtrl = require('./controllers/EmailCtrl'),
	OrderCtrl = require('./controllers/OrderCtrl');
		
	

//stripe
// require('./config/stripe');
require('./config_copy/stripe');


 

// require('./config/passport')(passport); // pass passport for configuration
require('./config_copy/passport')(passport); // pass passport for configuration

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongo at ' + mongoUri);
})	

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(cors());
app.use(bodyParser({ limit: 10000000 }));
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'best secret ever' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./admin/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport




//Amazon s3
// AWS.config.loadFromPath('./config/aws-config.json');
// AWS.config.loadFromPath('./config_copy/aws-config.json');
AWS.config.accessKeyId = process.env.S3_KEY;
AWS.config.secretAccessKey = process.env.S3_SECRET;
AWS.config.region = 'us-west-2';



var photoBucket = new AWS.S3({params: {Bucket: 'paulphin'}});


function uploadToS3(buf, file, callback) {
    photoBucket
        .upload({
            // Bucket: 'paulphin',
            ACL: 'public-read', 
            Body: buf, 
            Key: file.name,
            ContentType: file.type
        }, callback)
}

app.post('/upload', function (req, res){
    console.log(1111, req.body)
    var buf = new Buffer(req.body.image.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    var file = req.body.file;
    // var pid = '10000' + parseInt(Math.random() * 10000000);
 
    uploadToS3(buf, file, function (err, data) {
        if (err){
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        } else {
            res.send(data)
        }
    })
})



// store 
app.get('/api/products', ProductCtrl.get);

app.get('/api/photos', PhotoCtrl.get);

//login
app.post('/api/login', passport.authenticate('local', {
	failureFlash: true
}), function(req, res){
	res.send(req.user)
})

app.get('/api/auth', isLoggedIn, function(req, res){
	res.send(req.user)
})

//admin 
		//products
app.post('/admin/products', isAdmin, ProductCtrl.create);

app.get('/admin/products', isAdmin, ProductCtrl.get);

app.put('/admin/products', isAdmin, ProductCtrl.update);

app.delete('/admin/products', isAdmin, ProductCtrl.delete);

		//photos
app.post('/admin/photos', isAdmin, PhotoCtrl.create);

app.get('/admin/photos', isAdmin, PhotoCtrl.get);

app.put('/admin/photos', isAdmin, PhotoCtrl.update);

app.delete('/admin/photos', isAdmin, PhotoCtrl.delete);

		//orders
app.get('/admin/orders', isAdmin, OrderCtrl.get);

app.put('/admin/orders', isAdmin, OrderCtrl.update);

//customer
//add a cron job to delete all guests ofter 24 hours
app.post('/api/customers', CustomerCtrl.create);

app.get('/api/customers', CustomerCtrl.get);

app.put('/api/customers', CustomerCtrl.update);

app.delete('/api/customers', CustomerCtrl.delete);

			//cart
// app.post('/api/customers/cart/:customerId', CartCtrl.create);

// app.put('/api/customers/cart/:customerId/:cartItemId', CartCtrl.update);

// app.delete('/api/customers/cart/:customerId/:cartItemId', CartCtrl.delete);


//testing cart on session

function cart(req, res, next){
	if(!req.session.cart){
		req.session.cart = [];
		next()
	}
	next()
}

app.post('/api/cart/', cart, CartCtrl.addProduct);

app.get('/api/cart/', cart, CartCtrl.getCart);

app.put('/api/cart/remove', cart, CartCtrl.deleteItem);

app.put('/api/cart/', cart, CartCtrl.updateItem);



// app.put('/api/cart/', CartCtrl.update);

// app.delete('/api/cart/', CartCtrl.delete);

			//shippind address
app.post('/api/customers/address/:customerId', AddressCtrl.create);

app.put('/api/customers/address/:customerId/:addressId', AddressCtrl.update);

app.delete('/api/customers/address/:customerId/:addressId', AddressCtrl.delete);

//order
app.post('/api/orders', OrderCtrl.create);

app.get('/api/orders', OrderCtrl.get);

app.put('/api/orders', OrderCtrl.update);

//payment with stripe
app.post('/charge/:orderId', PaymentCtrl.submitStripe);

//emails
app.post('/api/email/send', EmailCtrl.sendEmail);
	


app.listen(port, function(){
	console.log('listening on ' + port)
})

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
        return next();
    }

    // if they aren't redirect them to the home page
    res.send(false);
}

function isAdmin(req, res, done) {
    if(req.user && req.user.admin){
        done();
    } else {
        // res.status(403).redirect('/admin');
        res.status(403).send('you isnt an admin')
    }
}	