const { ipcRenderer } = require('electron');

angular.module('SesadApp').controller('HomeCtrl', HomeCtrl);

function HomeCtrl($rootScope, $state, $mdToast, backService) {

  var vm = this;
  vm.loader = false;
  vm.clasesHoy = [];
  vm.allReservas = [];
  vm.choosedItem;

  vm.logout = function () {
    $rootScope._user = null;
    $rootScope.token = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    $state.go('login');
  }

  vm.unlock = function (code) {
    if(!code) return;
    vm.loader = true;
    backService.getReservaDetailByCode(code).then(function(res) {
      vm.loader = false;
      if (!res.data) {
        vm.loader = false;
        $mdToast.showSimple('No existe una reserva con ese código.');
      } else {
        ipcRenderer.send('unlock-pc', res.data.code)
        $mdToast.showSimple('PC desbloqueada. Cuentas con: ' + (res.data.horaOut - res.data.horaIn) + ' hora/s para usarla.')
      }
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudo obtener la reserva que solicitaste.');
    });
  }

  vm.loadHorario = function () {
    if (!$rootScope._user.grupo) return;
    vm.loader = true;
    backService.getClasesHoy($rootScope._user.grupo.id).then(function(res) {
      vm.clasesHoy = res.data;
      vm.loader = false;
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudimos cargar tus clases de hoy.');
    });
  }

  vm.loadReservas = function () {
    vm.loader = true;
    backService.getReservasHoy($rootScope._user.id).then(function(res) {
      console.log(res.data);
      vm.loader = false;
      vm.allReservas = res.data;
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudieron cargar las reservas.');
    });
  }

  vm.loadItems = function () {
    vm.loader = true;
    backService.getAllItems().then(function(res) {
      vm.loader = false;
      vm.allItems = res.data;
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudieron cargar los objetos.');
    });
  }

  vm.loadLocalItem = function () {
    vm.loader = true;
    var localItem = localStorage.getItem('localItem');
    if(!localItem) {
      vm.objeto = localItem;
      return vm.loader = false;
    }
    backService.getInventarioDetail(localItem).then(function(res) {
      vm.objeto = res.data;
      vm.loader = false;
    }).catch(function(err) {
      vm.loader = false;
      $mdToast.showSimple('Error, no se pudo cargar el objeto asignado a ésta máquina.');
    });
  }

  vm.saveItem = function (id) {
    vm.loader = true;
    localStorage.setItem('localItem', id);
    vm.loader = false;
    $mdToast.showSimple('Objeto asignado correctamente a ésta computadora.');
  }

  vm.isRole = function (role) {
    return $rootScope._user.roles.indexOf(role) >= 0;
  }

}
