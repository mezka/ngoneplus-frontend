const storeService = function() {

  let baseurl = '';

  this.setApiUrl = (value) => {
    baseurl = value;
  }

  this.$get = function ($http) {
    return {
      getStoreItems: () => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/store`,
        })
          .then((response) => response.data)
          .catch((error) => {
            console.log(error);
            return error.data;
          });

      },
      getProductById: (productid) => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/product/${productid}`
        })
          .then((response) => response.data)
          .catch((error) => {
            console.log(error);
            return error.data;
          });
      },
    };
  };
}

angular.module('app').provider('storeService', storeService);
