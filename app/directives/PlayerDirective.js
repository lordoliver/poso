angular.module('Poso.Directive').
  directive('player', ['boardActionService', function (boardActionService) {
    'use strict';

  
    return {
      restrict: 'A',
      scope: true,
      replace: true,
      templateUrl: 'app/partials/player.html',
      link: function (scope, element, attr) {
        scope.player = boardActionService[attr.player];
  	  }
	};

  }]);