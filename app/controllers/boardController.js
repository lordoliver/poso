angular.module('Poso.Controller')
  .controller('boardController',
  ['$scope','$element','boardActionService','$compile','computerService','FieldFactory',
    function ($scope,$element,boardActionService,$compile,computerService,FieldFactory) {
      'use strict';


      var borderFields = 8;
      var maxNumber = 16;
    
      this.getPositionOfField = function(field){
        return field.position;
      };

       this.createFields = function(){
        var numbers = getRandomNumbers();
        var x;
        var y;
        var fields = [];
        // array initialisation
        for(x = 0; x < borderFields; x++){
          fields[x] = [];
        }
        for(x = 0; x < borderFields; x++){
          var line = $("<tr/>");
          //$element.append(line);
          for(y = 0; y < borderFields; y++){
            fields[x][y] = new FieldFactory(numbers.pop(),{ x:x, y:y });
            //line.append($scope.fields[x][y]); 
          } 
        }
        computerService.fields = fields;
        $scope.fields = fields;
      };
      
      function getRandomNumbers(){
        var numbers = [];
        var temp;
        var currentPartner;
        var i;
        var cp;
        
        for (i=1; i<=maxNumber; i++){ // create numbers
          numbers.push(i);
          numbers.push(-i);
          numbers.push(i);
          numbers.push(-i);
        }
        for (var x = 0; x<1000;x++) // shuffle them
          for (i=0; i<borderFields*borderFields; i++){
              cp =  Math.round(Math.random() * (borderFields*borderFields-1));
              temp = numbers[i];
              numbers [i] = numbers[cp];
              numbers [cp] = temp;
          }
        return numbers;
      }

      this.createFields();
      boardActionService.nextPlayer();

    }
  ]);
