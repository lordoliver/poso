angular.module('Poso.Directive').
  directive('menu', ['menuService', function (menuService) {
    'use strict';

  
    return {
      restrict: 'A',
      scope: {},
      templateUrl: 'app/partials/menu.html',
      link: function (scope, element, attr) {
        scope.menuItems = menuService.getItems();

  	  }
	};

  }]);