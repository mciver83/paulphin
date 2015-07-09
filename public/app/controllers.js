var app = angular.module('ecommerce');


// admin and add, update and delete products
app.controller('adminCtrl', function($scope, authService){
	
	
})




app.controller('adminCtrl', function($scope, adminService, customerService, cartService, products){
	

	$scope.getProducts = function(){
		adminService.getProducts().then(function(response){
			$scope.products = response.data;
		})
	}

	$scope.products = products;

	$scope.addProduct = function(title, price, image, description){
		adminService.addProduct(title, price, image, description).then(function(response){
			$scope.newProduct = '';
			$scope.productPrice = '';
			$scope.productDescription = '';
			$scope.getProducts();
		})
	}

	$scope.updateProduct = function(id, title, description, price){
		if(confirm("Are you sure you want to update this products info?")){
			adminService.updateProduct(id, title, description, price).then(function(response){
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





//controls the home page of website
app.controller('homeCtrl', function($scope, customer){
	$scope.customer = customer;
	if($scope.customer){
		$scope.cart = $scope.customer.cart;
	}

})




//about page
app.controller('aboutCtrl', function($scope, instagram, customer, cart){

	$scope.feed = instagram;
	$scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// } 

	$scope.cart = cart
})


//contact page
app.controller('contactCtrl', function($scope, emailService, customer, cart){

	$scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// }
	$scope.cart = cart;

	$scope.sendEmail = function(fromEmail, fromName, toEmail, toName, subject, message){
		emailService.sendEmail(fromEmail, fromName, toEmail, toName, subject, message).then(function(response){
			$scope.fromEmail = '';
			$scope.fromName = '';
			$scope.message = '';
			alert('your message has been sent');
		})
	}
})




//controls the shopping area and views products
app.controller('shopCtrl', function($scope, $location, productService, cartService, cart, customerService, products, customer){

	$scope.customer = customer;
	// if($scope.customer){
	// 	$scope.cart = $scope.customer.cart;
	// }

	$scope.cart = cart;


	$scope.products = products;


	//use is session doesn't work
	// $scope.addToCart = function(customerId, productId, price){
	// 	cartService.addToCart(customerId, productId, price).then(function(response){
	// 		$scope.getCustomer();
	// 	})
	// }

	$scope.addToCart = function(product){
		var product = {
			id: product._id,
			title: product.title,
			image: product.image,
			price: product.price,
			quantity: 1
		}
		cartService.addToCart(product).then(function(response){
			$scope.cart = response.data;
		})
	}
})



// controls the ordering process
app.controller('checkoutCtrl', function($scope, $location, customer, customerService, cartService, orderService){

	$scope.customer = customer;
	$scope.cart = $scope.customer.cart;

	var name = $scope.customer.name;
	if(name.includes('guest', 0)){
		$scope.customer.name = '';
	}

	var total = 0;
	for(var i = 0; i < $scope.cart.length; i++){
		$scope.cart[i].total = $scope.cart[i].quantity * $scope.cart[i].product.price;
		total += $scope.cart[i].total;
		$scope.total = total.toFixed(2);
	}

	$scope.getCustomer = function(){
		customerService.getCustomer('_id', customer._id).then(function(response){
			$scope.customer = response.data[0];
			$scope.cart = $scope.customer.cart;
			$scope.total = 0;
			for(var i = 0; i < $scope.cart.length; i++){
				$scope.cart[i].total = $scope.cart[i].product.price * $scope.cart[i].quantity;
				$scope.total += Number($scope.cart[i].total);
			}
		})
	}

	// $scope.removeItem = function(customerId, itemId, quantity){
	// 	confirm('remove item from cart?');
	// 	cartService.removeItem(customerId, itemId).then(function(response){
	// 		$scope.getCustomer();
	// 	})
	// }

	// $scope.updateItem = function(customerId, itemId, quantity){
	// 	cartService.updateItem(customerId, itemId, quantity).then(function(response){
	// 		$scope.getCustomer();
	// 	})
	// }

	$scope.backToShop = function(){
		$location.path('/shop/' + customer._id);
	}

	$scope.showAddressForm = function(){
		$scope.show = true;
	}

	$scope.placeOrder = function(){
		var order = {
			customer: customer._id,
			products: $scope.customer.cart,
			total: $scope.total,
			address: $scope.customer.address[0]
		}
		orderService.placeOrder(order).then(function(response){
			$location.path('/payment/' + response.data._id);
		}, function(err){
			console.log(err);
		})
	}

	$scope.submitShippingInfo = function(name, email, shipTo, address, address2, city, state, zip){
		var address = {
			name: shipTo,
			address: address,
			address2: address2, 
			city: city,
			state: state,
			zip: zip
		};
		customerService.addAddress($scope.customer._id, address).then(function(response){
			alert('shipping address added')
		});

		var obj = {
			name: name,
			local: {
				email: email
			}
		}
		customerService.updateCustomer($scope.customer._id, obj).then(function(response){
			customerService.getCustomer('_id', customer._id).then(function(response){
				$scope.customer = response.data[0];
				$scope.cart = $scope.customer.cart;
				$scope.total = 0;
				for(var i = 0; i < $scope.cart.length; i++){
					$scope.total += Number($scope.cart[i].product.price * $scope.cart[i].quantity);
				}
			})
			$scope.placeOrder();
		})
	}

	
	
})

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
