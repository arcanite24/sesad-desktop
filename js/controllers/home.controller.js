angular.module('SesadApp').controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $state, backService) {

  var vm = this;
  vm.loader = false;
  vm.clasesHoy = [];

  vm.logout = function () {
    $rootScope._user = null;
    $rootScope.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    $state.go('login');
  }

  vm.loadHorario = function () {
    vm.loader = true;
    backService.getClasesHoy($rootScope._user.id).then(function(res) {
      console.log(res.data);
      vm.clasesHoy = res.data;
      vm.loader = false;
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudimos cargar tus clases de hoy.');
    });
  }

}
