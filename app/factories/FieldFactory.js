angular.module('Poso.Factory').
  service('FieldFactory',['boardActionService', function(boardActionService) {

    var fieldFactory = function(value,position) {
		this.value = value;
        this.active =  true;
        this.taken = false;
        this.position = position;
    };

    fieldFactory.prototype.isSelectable = function() {
    	return this.active && !this.taken;
    };

    fieldFactory.prototype.takeField = function() {
        boardActionService.getCurrentPlayer().addValue(this.value);
        this.taken = true;
        boardActionService.changeDirection(this.position);
        boardActionService.switchPlayer();
    };

    return fieldFactory;

}]);