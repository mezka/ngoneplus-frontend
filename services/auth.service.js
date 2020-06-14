const authService = function() {

  let baseurl = '';

  this.setApiUrl = (value) => {
    baseurl = value; 
  }

  this.$get = function($http) {
    return {
      isAuthenticated: () => {
        return $http({
          method: 'GET',
          url: `${baseurl}/api/login/check`
        })
        .then((response) => true )
        .catch((error) => Promise.reject(false));
      },
      attemptLogin: (userEmail, userPassword) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/login`,
          data: {
            email: userEmail,
            password: userPassword
          }
        }).then((response) => response.data);
      },
      logout: () => {  
        return $http({
          method: 'POST',
          url: `${baseurl}/api/logout`
        }).then((response) => response.data)
        .catch((error) => console.log(error));
      },
      register: (useremail, userpassword, userfirstname, userlastname) => {
        return $http({
          method: 'POST',
          url: `${baseurl}/api/register`,
          data: {
            useremail: useremail,
            userpassword: userpassword,
            userfirstname: userfirstname,
            userlastname: userlastname
          }
        })
        .then((response) => response.data)
        .catch((error) => console.log(error));
      }
    };
  };
};

angular.module('app').provider('authService', authService);
