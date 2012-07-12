var BASE_SECONDS_IN_ROUND = 180;
var NUMBER_OF_ROLLS = 15;
var DELAY_BETWEEN_ROLLS = 150;

var util = new Utility();
var game = new Game();

$(document).ready(function () {
	game.initNewRound();
});