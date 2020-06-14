const locationService = function() {

  let baseurl = '';

  this.setApiUrl = (value) => {
      baseurl = value; 
  }

  this.$get = function($http) {
    return {
      getCountries: () => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/location/countries`,
        })
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            return error;
          });
      },
      getStatesByCountryIso: (country_iso) => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/location/countries/${country_iso}`,
        })
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            return error;
          });
      },
      getCitiesByCountryIsoAndStateGeoName: (country_iso, geo_name) => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/location/countries/${country_iso}/${geo_name}`
        })
          .then(function (response) {
            return response.data;
          })
          .catch(function (error) {
            return error;
          });
      }
    };
  };
};

angular.module('app').provider('locationService', locationService);