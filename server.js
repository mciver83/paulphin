var express = require('express'),
	app = express(),
	cors = require('cors'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	port = 9003,
	passport = require('passport'),
	flash = require('connect-flash'),
	morgan = require('morgan'),
	AWS = require('aws-sdk'),
	fs = require('fs'),
	multer = require('multer'),
	cookieParser = require('cookie-parser'),
	mongoUri = 'mongodb://localhost:27017/paulphin';



//controllers
var ProductCtrl = require('./controllers/ProductCtrl'),
	PhotoCtrl = require('./controllers/PhotoCtrl'),
	CustomerCtrl = require('./controllers/CustomerCtrl'),
	CartCtrl = require('./controllers/CartCtrl'),
	AddressCtrl = require('./controllers/AddressCtrl'),
	EmailCtrl = require('./controllers/EmailCtrl'),
	OrderCtrl = require('./controllers/OrderCtrl'),
	PaymentCtrl = require('./controllers/PaymentCtrl');	
	


//stripe
var stripe = require("stripe")(
  "sk_test_hmNf5aQpZ0J4Lana3HtHlJDR"
);




//Amazon s3
AWS.config.loadFromPath('./config/aws-config.json');
var photoBucket = new AWS.S3({params: {Bucket: 'paulphin'}});
function uploadToS3(file, destFileName, callback) {
    photoBucket
        .upload({
            ACL: 'public-read', 
            Body: fs.createReadStream(file.path), 
            Key: destFileName.toString(),
            contentType: 'image/png'
            // ContentType: 'application/octet-stream' // force download if it's accessed as a top location
        })
        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#httpUploadProgress-event
        // .on('httpUploadProgress', function(evt) { console.log(evt); })
        // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#send-property
        .send(callback);
}

app.post('/upload', multer({limits: {fileSize:10*1024*1024}}), function (req, res){
	console.log(44444,req.body, req.files)
 
    if (!req.files || !req.files.file1) {
        return res.status(403).send('expect 1 file upload named file1').end();
    }
    var file1 = req.files.file1;
 
    // this is mainly for user friendliness. this field can be freely tampered by attacker.
    if (!/^image\/(jpe?g|png|gif)$/i.test(file1.mimetype)) {
        return res.status(403).send('expect image file').end();
    }
 
    var pid = '10000' + parseInt(Math.random() * 10000000);
 
    uploadToS3(file1, pid, function (err, data) {
        if (err) {
            console.error(err);
            return res.status(500).send('failed to upload to s3').end();
        }
        res.status(200)
            .send('File uploaded to S3: ' 
                    + data.Location.replace(/</g, '&lt;') 
                    + '<br/><img src="' + data.Location.replace(/"/g, '&quot;') + '"/>')
            .end();
    })
})

 

require('./config/passport')(passport); // pass passport for configuration

mongoose.connect(mongoUri);
mongoose.connection.once('open', function(){
	console.log('Connected to Mongo at ' + mongoUri);
})	

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(cors());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

// required for passport
app.use(session({ secret: 'best secret ever' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./admin/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport




// store 
app.get('/api/products', ProductCtrl.get);

app.get('/api/photos', PhotoCtrl.get);



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
    res.redirect('/admin/login');
}

function isAdmin(req, res, done) {
	console.log(111111, req.user)
    if(req.user && req.user.admin){
        done();
    } else {
        res.status(403).send('you isnt an admin')
    }
}	