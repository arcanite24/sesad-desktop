angular.module('SesadApp').factory('backService', backService);

function backService($http) {

  API = 'http://localhost:1337'

  return {

    // Admin -> login
    auth: function (username, password) {
      return $http.post(API + '/user/login', {username, password });
    },

    getAllItems: function () {
      return $http.get(API + '/inventario');
    },

    getInventarioDetail(id) {
      return $http.get(API + '/inventario/' + id);
    },

    // Alumno -> Home -> Horario
    getClasesHoy: function (id) {
      return $http.get(API + '/clasehorario/getMyHorario/' + id);
    },

    // Alumno -> Reservas
    getReservasHoy: function (id) {
      return $http.get(API + '/reserva/getMyReservas/' + id);
    },

    getReservaDetailByCode: function (code) {
      return $http.get(API + '/reserva/getReservaDetailByCode/' + code);
    },

  };
}
