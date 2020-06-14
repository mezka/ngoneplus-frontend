const cartService = function() {

  let baseurl = '';

  this.setApiUrl = (value) => {
      baseurl = value; 
  }

  this.$get = function($http) {
    return {
      addProductToCart: (productid, optionid, productname, optionname, imageurl, optionprice, quantity, discount) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/cart`,
          data: {
            productid: productid,
            optionid: optionid,
            productname: productname,
            optionname: optionname,
            imageurl: imageurl,
            optionprice: optionprice,
            quantity: quantity,
            discount: discount
          }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      },
      getCart: () => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/cart`
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      },
      checkoutCart: (addressid) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/cart/checkout`,
          data: {
            addressid: addressid,
          }
        })
        .then((response) => response.data)
        .catch((error) => {
          console.log(error);
          return Promise.reject(error);
        });
      },
      clearCart: () => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/cart/clear`
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      },
      deleteCartItem: (optionid) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/cart/delete`,
          data: { optionid }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      },
      updateCartItem: (cartObj) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/cart/update`,
          data: cartObj
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      }
    };
  };
}

angular.module('app').provider('cartService', cartService);
