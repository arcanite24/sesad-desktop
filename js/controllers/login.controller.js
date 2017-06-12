angular.module('SesadApp').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($mdToast, $rootScope, $state, backService) {

  var vm = this;

  vm.auth = function (username, password) {
    if(!username) return;
    if(!password) return;
    vm.loader = true;
    backService.auth(username, password).then(function(res) {
      if (res.data.err) {
        vm.loader = false;
        $mdToast.showSimple(res.data.err);
      } else {
        vm.loader = false;
        $mdToast.showSimple('Sesión iniciada correctamente');
        $rootScope._user = res.data.user;
        $rootScope.token = res.data.token;
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        $state.go('home');
      }
    }).catch(function(err) {
      $mdToast.showSimple('Error, no se pudo iniciar sesión. Verifica la conexión con el servidor.');
    });
  }

}
