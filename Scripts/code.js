/// <reference path="Classes.js" />
/// <reference path="jquery.signalR-0.5.2.min.js" />
/// <reference path="jquery-1.7.2.min.js" />

var BASE_SECONDS_IN_ROUND = 180;
var NUMBER_OF_ROLLS = 15;
var DELAY_BETWEEN_ROLLS = 150;

var util = new Utility();
var game = new Game();

var myChatHub = $.connection.chatHub;

myChatHub.addMsg = function (name, msg) {
	$('#messages').prepend(name + ': ' + msg + '\r');
};

$.connection.hub.start();

$(document).ready(function () {
	game.initNewRound();

	$("#btnSendMessage").click(function () {
		if ($('#msg').val() !== '') {
			playerName = $('#txtName').val() == '' ? "Anon" : $('#txtName').val();
			myChatHub.sendMessage(playerName, $('#msg').val());
		}
	});
});