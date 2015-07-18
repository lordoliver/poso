
angular.module('Poso.Directive', []);
angular.module('Poso.Controller', []);
angular.module('Poso.Service', []);
angular.module('Poso.Factory', []);

var app = angular.module('Poso', [
  'Poso.Service',
  'Poso.Controller',
  'Poso.Directive',
  'Poso.Factory'
]);
