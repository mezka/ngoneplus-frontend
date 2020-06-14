const orderService = function(){

  let baseurl = '';

  this.setApiUrl = (value) => {
      baseurl = value; 
  }

  this.$get = function($http) {
    return {
      getOrders: () => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/orders`
        }).then((response) => {
          return response.data.map((order) => {
            order.address = parsingService.parseAddressObjToString(order);

            delete order.address1;
            delete order.address2;
            delete order.city;
            delete order.state;
            delete order.country;
            delete order.zipcode;

            order.orderprice = order.orderitems.reduce((acum, element) => acum + element.quantity * element.optionprice * (100 - element.discount) / 100, 0);

            return order;
          });
        })
        .catch((error) => console.log(error));
      },
      getOrderById: (orderid) => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/order/${orderid}`
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      }
    };
  };
};


angular.module('app').provider('orderService', orderService);