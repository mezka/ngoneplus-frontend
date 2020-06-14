const userService = function(){

    let baseurl = '';

    this.setApiUrl = (value) => {
        baseurl = value; 
    }

    this.$get = function($http) {
        return {
            getAddressList(){
                return $http({
                    method: 'GET',
                    url: `${baseurl}/api/address`,
                }).then(function(response) {
                    console.log(response.data);
                    return response.data;
                }).catch(function(error) {
                    console.log(error);
                    return Promise.reject(error);
                });
            },
        
            getUserData(){
                return $http({
                    method: 'GET',
                    url: `${baseurl}/api/user`
                }).then(function(response){
                    return response.data;
                }).catch(function(error){
                    console.log(error);
                    return Promise.reject(error);
                })
            },
        
            addUserAddress(addressData){
                return $http({
                    method: 'POST',
                    url: `${baseurl}/api/address/add`,
                    data: addressData
                }).then(function(response){
                    return response.data;
                }).catch(function(error){
                    console.log(error);
                    return Promise.reject(error);
                })
            },
        
            deleteUserAddress(addressId){
                return $http({
                    method: 'POST',
                    url: `${baseurl}/api/address/delete`,
                    data: { addressid: addressId }
                }).then(function(response){
                    return response.data;
                }).catch(function(error){
                    console.log(error);
                })
            }
        };
    }
}

angular.module('app').provider('userService', userService);