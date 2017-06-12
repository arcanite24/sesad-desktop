angular.module('SesadApp').factory('backService', backService);

function backService($http) {

  API = 'http://test.epsidev.com'

  return {

    // Admin -> login
    auth: function (username, password) {
      return $http.post(API + '/user/login', {username, password });
    },

    // Alumno -> Home -> Horario
    getClasesHoy: function (id) {
      return $http.get(API + '/clasehorario/getMyHorario/' + id);
    }

  };
}
