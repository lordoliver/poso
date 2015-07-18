angular.module('Poso.Service').
  service('rankingService', ['$timeout',function($timeout) {

  var service  = {};

  service.getPlayers = function(){
    return [{
      name: 'Player 1',
      points: 100
    },{
      name: 'Player 2',
      points: 50
    },{
      name: 'Player 3',
      points: 10
    },{
      name: 'Player 4',
      points: 5
    },{
      name: 'Player 5',
      points: 2
    }];
  };

    return service;
  }]);