angular.module('Poso.Service').
  service('menuService', ['$sce','$compile',function($sce,$compile) {

  var service  = {};

  service.getItems = function(){
    return [{
      name: $sce.trustAsHtml('neues Spiel'),
      cssClass:'newGame',
      action : function(){}
    },{
      name: $sce.trustAsHtml('<u><i></i><i></i><i></i><i></i><i></i><i></i></u>Einstellungen'),
      cssClass:'settings',
      action : function(){}
    },{
      name: $sce.trustAsHtml('Informationen'),
      cssClass:'information',
      action : function(scope){
        var rules = angular.element("<div ng-include=\"'app/partials/rules.html'\">");
        angular.element('body').append($compile(rules)(scope));

      }

    }];
  };
    return service;
  }]);