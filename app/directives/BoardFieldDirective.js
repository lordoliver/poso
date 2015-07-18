angular.module('Poso.Directive').
  directive('boardField', ['boardActionService','computerService', '$parse', 
    function (boardActionService,computerService,$parse) {
    'use strict';

    return {
      restrict: 'A',
      scope: {
        obj: "="
      },

      replace: true,
      templateUrl: 'app/partials/boardField.html',
      link: function (scope, element, attr) {
        scope.value = scope.obj.value;
        scope.absVal = Math.abs(scope.value);
        scope.negative = scope.value < 0;

        scope.take = function(){
          if (scope.obj.isSelectable()){
            scope.obj.takeField();
            computerService.computerMove();
          }
        };

        scope.$watch(function(){
          return boardActionService.isEnabled(scope.obj.position);
        },function(newVal){
          scope.obj.active = newVal;
        });
      }
  };

  }]);