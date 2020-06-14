const SweetAlert = angular.module('SweetAlert', []);

SweetAlert.factory('Swal', function () {
  return window.Swal;
})

const env = {};

if(window){  
  Object.assign(env, window.__env);
}

var app = angular.module('app', ['ui.router', 'ngAnimate', 'SweetAlert', 'ngFlash', 'templates']);

app.constant('__env', env);