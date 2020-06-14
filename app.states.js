const states = {
  homeState: {
    url: '/',
    name: 'home',
    templateUrl: '/views/home/home.html',
    authenticate: false
  },
  storeState: {
    name: 'store',
    url: '/store',
    templateUrl: '/views/store/store.html',
    controller: 'storeController as store',
    resolve: {
      storeItems: ['storeService', function (storeService) {
        return storeService.getStoreItems();
      }]
    }
  },
  productState: {
    name: 'product',
    url: '/product/{productid}',
    params: { productid: null },
    templateUrl: '/views/product/product.html',
    controller: 'productController as product',
    resolve: {
      options: ['storeService', '$transition$', function (storeService, $transition$) {
        return storeService.getProductById($transition$.params().productid);
      }],
    }
  },
  loginState: {
    name: 'login',
    url: '/login',
    templateUrl: '/views/login/login.html',
    controller: 'loginController as login',
  },
  signupState: {
    name: 'signup',
    url: '/signup',
    templateUrl: '/views/signup/signup.html',
    controller: 'signupController as signup',
  },
  cartState: {
    name: 'cart',
    url: '/cart',
    templateUrl: '/views/cart/cart.html',
    controller: 'cartController as cart',
    resolve: {
      items: ['cartService', function (cartService) {
        return cartService.getCart();
      }],
      addresses: ['userService', 'parseAddressObjToString', function (userService, parseAddressObjToString) {
        return userService.getAddressList()
          .then(function (data) {
            return data.map(function (addressObj) {
              return { id: addressObj.id, name: parseAddressObjToString(addressObj) };
            });
          })
          .catch(function (result) {
            return null;
          })
      }],
    }
  },
  orderState: {
    name: 'orders',
    url: '/orders',
    templateUrl: '/views/orders/orders.html',
    data: { requiresAuth: true },
    controller: 'ordersController as orders',
    resolve: {
      orderlist: ['orderService', function (orderService) {
        return orderService.getOrders();
      }]
    }
  },
  paymentState: {
    name: 'payment',
    url: '/order/payment',
    templateUrl: '/views/payment/payment.html',
    data: { requiresAuth: true },
    params: { orderid: null },
    controller: 'paymentController as payment',
  },
  userControlPanelState:{
    name: 'usercp',
    url: '/user/cp',
    templateUrl: '/views/usercp/usercp.html',
    controller: 'userControlPanelController as userCP',
    data: { requiresAuth: true },
    params: { modal: false },
    resolve: {
      user: ['userService', function (userService) {
        return userService.getUserData();
      }],
      countries: ['locationService', function (locationService) {
        return locationService.getCountries();
      }]
    },
    onEnter: ['$rootScope', '$stateParams', function ($rootScope, $stateParams) {
      if ($stateParams.modal) {
        setTimeout(() => { $rootScope.$broadcast('toggleModal') }, 0)
      }
    }],
  },
  receiptState: {
    name: 'receipt',
    url: '/order/receipt/:orderid',
    templateUrl: '/views/receipt/receipt.html',
    controller: 'receiptController as receipt',
    data: { requiresAuth: true },
    params: { orderid: null },
    resolve: {
      receiptData: ['orderService', '$transition$', function (orderService, $transition$) {

        return orderService.getOrderById($transition$.params().orderid);
      }]
    }
  }
}

angular.module('app').constant('states', states);