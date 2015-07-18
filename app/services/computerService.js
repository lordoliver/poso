angular.module('Poso.Service').
  service('computerService', ['$timeout',function($timeout) {

  var service  = {};
  service.currentDirection = null;



  service.getSelectable = function(fields){
    var selectable = [];
    for (var x = 0; x<service.fields.length;x++){
      for (var y = 0; y<service.fields[x].length;y++){
        if (service.fields[x][y].isSelectable())
            selectable.push(service.fields[x][y]);
      } 
    }
    return selectable;
  };
  
  
  service.move = function(){
    // TODO: write logic for better computer
    var selectable = service.getSelectable();
    var highest = null;
    for (i = 0; i<selectable.length; i++){
      if (highest === null || selectable[i].value>highest.value)
        highest = selectable[i];
    }
    highest.takeField();
  };
  
  service.computerMove = function(){
    // calculate and move
    $timeout(function(){service.move();},500);
  };

    return service;
  }]);