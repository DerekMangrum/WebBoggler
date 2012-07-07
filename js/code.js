$(document).ready(function () {
	$(document.getElementById('btnPause')).attr('disabled', 'true');
	$(document.getElementById('btnStop')).attr('disabled', 'ture');
	newRound = true;
});

var BASE_SECONDS_IN_ROUND = 180;
var NUMBER_OF_ROLLS = 15;
var DELAY_BETWEEN_ROLLS = 150;

var newRound;
var secondsRemainingInRound;


function StartRound(isNewRound) {
	newRound = false;
	$(document.getElementById('btnStart')).attr('disabled', 'true');

	if (isNewRound) {
		RollDiceMultipleTimes(NUMBER_OF_ROLLS);
		setTimeout("CreateTimer('txtTimer', BASE_SECONDS_IN_ROUND)", NUMBER_OF_ROLLS * DELAY_BETWEEN_ROLLS);
	}
	else {
		CreateTimer('txtTimer', secondsRemainingInRound);
	}

	$(document.getElementById('btnPause')).removeAttr('disabled');
	$(document.getElementById('btnStop')).removeAttr('disabled');
}


function PauseRound() {
	clearTimeout(CountdownTimer);
	$(document.getElementById('btnStart')).removeAttr('disabled');
	$(document.getElementById('btnPause')).attr('disabled', 'true');
}


function ResetRound() {
	PauseRound();
	$(document.getElementById('btnStart')).removeAttr('disabled');
	$(document.getElementById('btnPause')).attr('disabled', 'true');
	$(document.getElementById('btnStop')).attr('disabled', 'true');
	RoundTimerControl.innerHTML = '3:00';
	newRound = true;
}


//***********************************************
// Dice Rolling Functions
//***********************************************

//These are the Boggle Dice from the original game
function GetDice() {
	var allDice = new Array(16);
	allDice[0] = ['H', 'W', 'E', 'G', 'E', 'N'];
	allDice[1] = ['P', 'O', 'H', 'C', 'S', 'A'];
	allDice[2] = ['S', 'E', 'O', 'T', 'I', 'S'];
	allDice[3] = ['N', 'M', 'I', 'Qu', 'U', 'H'];
	allDice[4] = ['H', 'R', 'V', 'T', 'E', 'W'];
	allDice[5] = ['E', 'N', 'U', 'I', 'E', 'S'];
	allDice[6] = ['E', 'V', 'L', 'E', 'Y', 'D'];
	allDice[7] = ['O', 'T', 'W', 'A', 'T', 'O'];
	allDice[8] = ['P', 'K', 'A', 'F', 'S', 'F'];
	allDice[9] = ['H', 'Z', 'L', 'R', 'N', 'N'];
	allDice[10] = ['A', 'J', 'B', 'O', 'B', 'O'];
	allDice[11] = ['D', 'S', 'Y', 'I', 'T', 'T'];
	allDice[12] = ['C', 'T', 'U', 'I', 'M', 'O'];
	allDice[13] = ['L', 'R', 'Y', 'T', 'T', 'E'];
	allDice[14] = ['E', 'A', 'N', 'A', 'E', 'G'];
	allDice[15] = ['E', 'D', 'L', 'X', 'R', 'I'];

	return allDice;
}

//Returns the rolled dice in random order
function RollDice() {
	//gets the dice
	diceToRoll = GetDice();

	//used to store the dice rolls
	var dieValues = new Array(diceToRoll.length);

	//used for array splicing to remove selected dice
	var randomNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

	$.each(diceToRoll, function () {
		//pick a random number to be used as an array index
		var m = randomNums.GetRandomElement();

		//roll the current die and insert it into the random index 'm'
		dieValues[m] = this.GetRandomElement();

		//remove 'm' from the list of available indexes
		randomNums.splice($.inArray(m, randomNums), 1);
	});

	return dieValues;
}


// Timeout to roll dice and update display multiple times with small delat
function RollDiceMultipleTimes(numberOfRolls) {
	if (numberOfRolls > 0) {
		//get rolled dice
		var dice = RollDice();
		
		//counter
		var x = 0;
		
		//foreach through the dice and update the Dice Controls
		$.each(dice, function () {
			document.getElementById('die' + x).value = this;
			x++;
		});

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

	RoundTimerControl = document.getElementById(TimerDisplayControlID);
	secondsRemainingInRound = NumberOfSecondsToRunTimer;

	UpdateTimer();
	CountdownTimer = window.setTimeout("Tick()", 1000);
}

function Tick() {
	if (secondsRemainingInRound <= 0) {
		alert("Time's up!");
		$(document.getElementById('btnPause')).attr('disabled', 'true');
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

	RoundTimerControl.innerHTML = TimeStr;
}


//***************************************
// Uitlity Functions
//***************************************

//Used to get a random element from an Array
Array.prototype.GetRandomElement = function () {
	return this[Math.floor(Math.random() * this.length)]
}

//Inserts leading zero on time value less than 10
function LeadingZero(time) {
	return (time < 10) ? "0" + time : +time;
}