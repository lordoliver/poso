angular.module('Poso.Factory').
  service('PlayerFactory',[ function() {


    var PlayerFactory = function(name,points) {
		this.name = name;
        this.points = points;
        this.type = PlayerFactory.PLAYER_TYPE.LOCAL;
    };

    PlayerFactory.PLAYER_TYPE = {
        LOCAL: "LOCAL",
        COMPUTER: "COMPUTER",
        REMOTE: "REMOTE"
    };

    PlayerFactory.prototype.addValue = function(value) {
    	return this.points += value;
    };

    return PlayerFactory;

}]);