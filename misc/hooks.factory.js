const hooks = (transitionService, authService) => {
  return {
    loginHook(){
      
      const requiresAuthCriteria = {
        to: function(state){
          return state.data && state.data.requiresAuth;
        }
      };
        
      const redirectToLogin = (transition) => {
    
        const authService = transition.injector().get('authService');
        const $state = transition.router.stateService;
    
        authService.isAuthenticated()
        .catch(function(){
          return $state.go('login', undefined, { location: false });
        });
      };
    
      transitionService.onBefore(requiresAuthCriteria, redirectToLogin, {priority: 10});
    },
    errorHandler($state) {
      $state.defaultErrorHandler(function (error) {
      });
    }
  }
};

angular.module('app').factory('hooks', [
  '$transitions',
  'authService',
  hooks
]);

