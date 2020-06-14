app.config(function(authServiceProvider, cartServiceProvider, locationServiceProvider, orderServiceProvider, paymentServiceProvider, storeServiceProvider, userServiceProvider, states, __env, $stateProvider, $urlRouterProvider, $uiRouterProvider){
  
  authServiceProvider.setApiUrl(__env.apiUrl);
  cartServiceProvider.setApiUrl(__env.apiUrl);
  locationServiceProvider.setApiUrl(__env.apiUrl);
  orderServiceProvider.setApiUrl(__env.apiUrl);
  paymentServiceProvider.setApiUrl(__env.apiUrl);
  storeServiceProvider.setApiUrl(__env.apiUrl);
  userServiceProvider.setApiUrl(__env.apiUrl);

  for(stateName in states){
    $stateProvider.state(states[stateName]);
  }
  
  $urlRouterProvider.otherwise('/');
  
  $uiRouterProvider.stateService.defaultErrorHandler(function(error){
  });
});