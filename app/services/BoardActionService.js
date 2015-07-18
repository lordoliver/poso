angular.module('Poso.Service').
  service('boardActionService',['computerService','PlayerFactory', function(computerService,PlayerFactory) {

  var service = {};
	service.enabled = {x: null, y:null};
  service.currentPosition = null;
  service.playerFlag = (Math.round(Math.random()) === 0);
  service.player1 = new PlayerFactory("Player",0);
  service.player2 = new PlayerFactory("Computer",0);
  service.player2.type = PlayerFactory.PLAYER_TYPE.COMPUTER;
  service.fields = [];

  service.isClickable = function(){
    return service.getCurrentPlayer().type === PlayerFactory.PLAYER_TYPE.LOCAL;
  };

  service.nextPlayer=function(){
    service.switchPlayer();
    if(service.getCurrentPlayer().type === PlayerFactory.PLAYER_TYPE.COMPUTER){
      computerService.computerMove();
    }
  };

  service.getCurrentPlayer = function(){
    if (service.playerFlag) return service.player1;
    else return service.player2;
  };

  service.isEnabled = function(position){	
		return (service.enabled.x === null && service.enabled.y === null) ||
			position.x === service.enabled.x || 
          	position.y === service.enabled.y;
	};

  service.switchPlayer = function(){
    service.playerFlag = !service.playerFlag;
  };

  service.changeDirection = function(position){
    // all
    if (service.enabled.x === null && service.enabled.y === null){
      service.enabled = {x:position.x,y:position.y};
    } 
    // x
    else if ((service.enabled.x === null && service.enabled.y !== null)){
      service.enabled = {x:position.x,y:null};
    }
    // y
    else if ((service.enabled.x !== null && service.enabled.y === null)){
      service.enabled = {x:null,y:position.y};
    }
    // cross
    else if ((service.enabled.x !== null && service.enabled.y !== null)){
      if (service.currentPosition.x === position.x){
        service.enabled = {x:null,y:position.y};
      }
      else if (service.currentPosition.y === position.y){
        service.enabled = {x:position.x,y:null};
      }
      else alert('error! you should not come here!');
    }
    
    service.currentPosition = position;
  };



  return service;
}]);