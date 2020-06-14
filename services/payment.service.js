const paymentService = function() {

    let baseurl = '';

    this.setApiUrl = (value) => {
        baseurl = value; 
    }

    this.$get = function($http) {
        return {
            charge: (paymentinfo) => {
                return $http({
                    method: 'POST',
                    url: `${baseurl}/api/order/charge`,
                    data: {
                        orderid: paymentinfo.orderid,
                        cardnumber: paymentinfo.cardnumber,
                        cvc: paymentinfo.cvc,
                        exp_year: paymentinfo.exp_year,
                        exp_month: paymentinfo.exp_month
                    }
                }).then(function(response) {
                    return response.data;
                }).catch(function(error) {
                    console.log(error);
                    throw error;
                });
            },
        };
    };
}

angular.module('app').provider('paymentService', paymentService);
