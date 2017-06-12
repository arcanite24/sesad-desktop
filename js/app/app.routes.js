angular.module('SesadApp').config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {url: '/login', templateUrl: 'templates/login.template.html', controller: 'LoginCtrl as login'})
    .state('home', {url: '/home', templateUrl: 'templates/home.template.html', controller: 'HomeCtrl as home'})
});
