angular.module('SesadApp', [
  'ui.router',
  'ngAnimate',
  'ngMaterial'
]);

angular.module('SesadApp').run(function ($rootScope, $state) {

  var token = localStorage.getItem('token');
  var user = JSON.parse(localStorage.getItem('user'));
  if (!token) {
    $state.go('login');
    $rootScope._user = null;
    $rootScope.token = null;
    $rootScope.loader = false;
  } else {
    $rootScope.token = token;
    $rootScope._user = user;
    $rootScope.loader = false;
  }

  var allowedStates = ['login'];

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
    if (!$rootScope.token && allowedStates.indexOf(toState.name) < 0) {
      event.preventDefault();
      $state.go('login');
    }
  });

});

moment.locale('es');

document.onkeydown = function (e) {
  
}
