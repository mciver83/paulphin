var app = angular.module('ecommerce');


// admin and add, update and delete products
app.controller('adminCtrl', function($scope, adminService, customerService, cartService, products, photos, fileReader){
	

	$scope.products = products;
	$scope.photos = photos;
	$scope.typeOptions = ['favorite', 'featured', 'product'];


	console.log(fileReader)
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
 
    $scope.$on("fileProgress", function(e, progress) {
        $scope.progress = progress.loaded / progress.total;
    });




	$scope.getProducts = function(){
		adminService.getProducts().then(function(response){
			$scope.products = response.data;
		})
	}

	

	$scope.addProduct = function(title, price, image, description, type){
		adminService.addProduct(title, price, image, description, type).then(function(response){
			$scope.productTitle = '';
			$scope.productPrice = 20;
			$scope.productDescription = '';
			$scope.productImage = 'app/images/';
			$scope.productType = '';
			$scope.getProducts();
		})
	}

	$scope.updateProduct = function(id, title, description, price, type){
		if(confirm("Are you sure you want to update this products info?")){
			adminService.updateProduct(id, title, description, price, type).then(function(response){
				alert('This product has been updated.')
				$scope.getProducts();
			})
		}
	}

	$scope.removeProduct = function(id){
		if(confirm("Are you sure you want to delete this product?")){
			adminService.removeProduct(id).then(function(response){
				$scope.getProducts();
			})
		}
	}


	$scope.getPhotos = function(){
		adminService.getPhotos().then(function(response){
			$scope.photos = response.data;
		})
	}

	

	$scope.addPhoto = function(title, imageSrc, description, type, auth){
		adminService.addPhoto(title, imageUrl, description, type, auth).then(function(response){
			$scope.imageTitle = '';
			$scope.imageDescription = '';
			$scope.imageSrc = '';
			$scope.imageType = '';
			$scope.imageAuth = 'store';
			$scope.getPhotos();
		})
	}

	$scope.updatePhoto = function(id, title, imageUrl, description, type, auth){
		if(confirm("Are you sure you want to update this image's info?")){
			adminService.updatePhoto().then(function(response){
				alert('This image has been updated.')
				$scope.getImages();
			})
		}
	}

	$scope.removePhoto = function(id){
		if(confirm("Are you sure you want to delete this image?")){
			adminService.removePhoto(id).then(function(response){
				$scope.getPhotos();
			})
		}
	}

})




//admin orders
app.controller('orderCtrl', function($scope, orders, adminService){
	$scope.orders = orders;

	$scope.paymentStatusOptions = ['waiting', 'processing', 'paid'];
	$scope.orderStatusOptions = ['processing', 'shipping', 'on hold', 'delivered'];

	$scope.updateOrder = function(orderId, paymentStatus, orderStatus){

		adminService.updateOrder(orderId, paymentStatus, orderStatus).then(function(response){
			alert('order updated');
		})
	}
})






//---------------------------------------------------//







//controls the home page of website
app.controller('homeCtrl', function($scope){
	// $scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// }

})





//---------------------------------------------------//




//about page
app.controller('aboutCtrl', function($scope, instagram){

	$scope.feed = instagram;
	// $scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// } 

})





//---------------------------------------------------//



//contact page
app.controller('contactCtrl', function($scope, emailService){

	// $scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// }


	$scope.sendEmail = function(fromEmail, fromName, toEmail, toName, subject, message){
		emailService.sendEmail(fromEmail, fromName, toEmail, toName, subject, message).then(function(response){
			$scope.fromEmail = '';
			$scope.fromName = '';
			$scope.message = '';
			alert('your message has been sent');
		})
	}
})








//---------------------------------------------------//






//controls the shopping area and views products
app.controller('shopCtrl', function($scope, $location, productService, cartService, cart, customerService, products, photos){

	// $scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// }

	$scope.cart = cart;


	$scope.products = products;
	$scope.photos = photos;

	$scope.favorites = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].type === 'favorite'){
			$scope.favorites.push($scope.products[i])
		}
	}

	$scope.buildProducts = [];
	for(var i = 0; i < $scope.products.length; i++){
		if($scope.products[i].type === 'product'){
			$scope.buildProducts.push($scope.products[i])
		}
	}


	$scope.print = 'print';
	$scope.item = 'product';

	$scope.item = 'app/images/build-item.png';
	$scope.imageUrl = 'app/images/build-image.png';




	$scope.buildItem = function(item){
		$scope.product = item;
		$scope.item = item.image;
	}

	$scope.buildImage = function(image){
		$scope.photo = image;
		$scope.imageUrl = image.imageUrl;
	}


	$scope.addToCart = function(item, photo){
		console.log(item, photo)
		if(photo){
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				},
				photo: {
					id: photo._id,
					imageUrl: photo.imageUrl
				}, 
				quantity: 1
			}
		} else {
			var product = {
				item: {
					id: item._id,
					title: item.title,
					imageUrl: item.image,
					price: item.price,
				}, 
				quantity: 1
			}
		}
		cartService.addToCart(product).then(function(response){
			$scope.imageUrl = 'app/images/build-image.png';
			$scope.item = 'app/images/build-item.png';
			$scope.cart = response.data;
		})
	}
})






//---------------------------------------------------//





// controls the ordering process
app.controller('checkoutCtrl', function($scope, $location, customerService, cartService, orderService, cart){

	// $scope.customer = customer;
	$scope.cart = cart;
	console.log(cart)

	var total = 0;
	for(var i = 0; i < $scope.cart.length; i++){
		$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].price;
		total += $scope.cart[i].total;
		$scope.total = total.toFixed(2);
	}

	$scope.backToShop = function(){
		$location.path('/shop/');
	}

	$scope.placeOrder = function(customer, address, products){
		var order = {
			customer: customer,
			products: products,
			total: $scope.total,
			address: address
		}
		orderService.placeOrder(order).then(function(response){
			$location.path('/payment/' + response.data._id);
		}, function(err){
			console.log(err);
		})
	}

	$scope.submitShippingInfo = function(name, email, shipTo, address, address2, city, state, zip){
		var customer = {
			name: name,
			email: email
		}

		var address = {
			name: shipTo,
			address: address,
			address2: address2, 
			city: city,
			state: state,
			zip: zip
		}

		var products = [];
		for(var i = 0; i < $scope.cart.length; i++){
			if($scope.cart[i].photo){
				var product = {
					product: $scope.cart[i].item.id,
					photo: $scope.cart[i].photo.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				}
			} else {
				product = {
					product: $scope.cart[i].item.id,
					price: $scope.cart[i].item.price,
					quantity: $scope.cart[i].quantity
				}
			}
			products.push(product);
		}


		$scope.placeOrder(customer, address, products);
	}
})








//---------------------------------------------------//






app.controller('paymentCtrl', function($scope, order){
	console.log(order);
	$scope.order = order;
	if(!$scope.order.address.name){
		$scope.order.address.name = $scope.order.customer.name
	}

	$scope.chargeLocation = '/charge/' + $scope.order._id;
})

app.controller('confirmationCtrl', function($scope, order){
	$scope.order = order;
})
