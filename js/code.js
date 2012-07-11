﻿$(document).ready(function () {
	$('#btnPause').attr('disabled', 'true');
	$('#btnStop').attr('disabled', 'ture');
	newRound = true;
});

var BASE_SECONDS_IN_ROUND = 180;
var NUMBER_OF_ROLLS = 15;
var DELAY_BETWEEN_ROLLS = 150;

var diceHidden = false;
var newRound;
var secondsRemainingInRound;

var board = new Board();

function StartRound(isNewRound) {
	newRound = false;
	$('#btnStart').attr('disabled', 'true');

	if (isNewRound) {
		RollDiceMultipleTimes(NUMBER_OF_ROLLS);
		setTimeout("CreateTimer('txtTimer', BASE_SECONDS_IN_ROUND)", NUMBER_OF_ROLLS * DELAY_BETWEEN_ROLLS);
	}
	else {
		CreateTimer('txtTimer', secondsRemainingInRound);
	}

	$('#btnPause').removeAttr('disabled');
	$('#btnStop').removeAttr('disabled');

	if (diceHidden) {
		ToggleDiceVisible();
		diceHidden = false;
	}
}

function PauseRound() {
	clearTimeout(CountdownTimer);
	$('#btnStart').removeAttr('disabled');
	$('#btnPause').attr('disabled', 'true');

	if (!diceHidden) {
		ToggleDiceVisible();
		diceHidden = true;
	}
}

function ResetRound() {
	PauseRound();
	$('#btnStart').removeAttr('disabled');
	$('#btnPause').attr('disabled', 'true');
	$('#btnStop').attr('disabled', 'true');
	RoundTimerControl.text('3:00');
	newRound = true;

	if (diceHidden) {
		ToggleDiceVisible();
		diceHidden = false;
	}
}

//***********************************************
// Dice Rolling Functions
//***********************************************
function RollDiceMultipleTimes(numberOfRolls) {
	if (numberOfRolls > 0) {
		board.RandomizeDice();
		DisplayDiceOnForm();
		numberOfRolls--;
		if (numberOfRolls > 0) {
			setTimeout('RollDiceMultipleTimes(' + numberOfRolls + ')', DELAY_BETWEEN_ROLLS);
		};
	};
}

//*********************************
// Game Timer Functions
//*********************************
var RoundTimerControl;
var CountdownTimer;

function CreateTimer(TimerDisplayControlID, NumberOfSecondsToRunTimer) {
	RoundTimerControl = $("#" + TimerDisplayControlID);
	secondsRemainingInRound = NumberOfSecondsToRunTimer;

	UpdateTimer();
	CountdownTimer = window.setTimeout("Tick()", 1000);
}

function Tick() {
	if (secondsRemainingInRound <= 0) {
		alert("Time's up!");
		$('#btnPause').attr('disabled', 'true');
		return;
	}

	secondsRemainingInRound -= 1;
	UpdateTimer();
	CountdownTimer = window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
	var Seconds = secondsRemainingInRound;

	var Minutes = Math.floor(Seconds / 60);
	Seconds -= Minutes * (60);

	var TimeStr = Minutes + ":" + LeadingZero(Seconds);

	RoundTimerControl.text(TimeStr);
}

//***************************************
//Rotate Board Functions
//***************************************
function RotateCW() {
	board.RotateCW();
	DisplayDiceOnForm();
}

function RotateCCW() {
	board.RotateCCW();
	DisplayDiceOnForm();
}

//***************************************
// Utility Functions
//***************************************

function LeadingZero(time) {
	return (time < 10) ? "0" + time : +time;
}

function ToggleDiceVisible() {
	$('[id^="die"]').toggleClass('dice-hidden');
}

function ClearTextBox() {
	$('#txtResults').val('');
}

function DisplayDiceOnForm() {
	$.each(board.Dice, function (idx, die) {
		$('#die' + idx).val(die.faceUp);
	});
}


//**********************************************************************************
//  Word Lookup Functions
//
// SEE: http://forum.jquery.com/topic/jquery-ajax-and-xml-issues-no-element-found
//   for workaround on how to use AJAX for off-domain queries
//**********************************************************************************
function LookupWord() {
	var word = $('#txtWordToFind').val().toLowerCase();
	var url = './xmlparse.asp?word=' + word;
	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		success: LookupWordResults
	});
}

function LookupWordResults(xml) {
	if ($(xml).find("entry").length > 0) {
		$('#txtResults').val(':-)');
	}
	else {
		$('#txtResults').val(':-(');
	}
}