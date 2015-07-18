angular.module('Poso.Directive').
  directive('ranking', ['rankingService', function (rankingService) {
    'use strict';

  
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'app/partials/ranking.html',
      link: function (scope, element, attr) {
        scope.players = rankingService.getPlayers();
  	  }
	};

  }]);