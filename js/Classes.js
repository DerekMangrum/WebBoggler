//Classes
//- Die : done?
//- Board : done?
//- Round : done?
//	- has: board, roundNumber, startRound(), pauseRound()
//- Game : started?
//	- has: gameID, rounds[], players[], newRound()
//- WordLookup
//- Player
//  - playerID, playerName, playerScore
//
// CONVERT THESE NOTES TO TRELLO!!

//*****************************************************************
// Die class
//
// Parameter: an array of values representing the sides of the dice
// Example: var dice1 = new Dice(['a','b','c','d','e','f']);
//*****************************************************************
function Die(sides) {
	var sides = sides;
	var faceUp = sides[0];
	function roll() {
		var x = Math.floor(Math.random() * this.sides.length);
		this.faceUp = this.sides[x];
	}

	return {
		sides: sides,
		faceUp: faceUp,
		roll: roll
	};
};

//******************************
//Board class
//******************************
function Board() {
	var diceHidden = false;

	var dice = new Array(
		new Die(['H', 'W', 'E', 'G', 'E', 'N']),
		new Die(['P', 'O', 'H', 'C', 'S', 'A']),
		new Die(['S', 'E', 'O', 'T', 'I', 'S']),
		new Die(['N', 'M', 'I', 'Qu', 'U', 'H']),
		new Die(['H', 'R', 'V', 'T', 'E', 'W']),
		new Die(['E', 'N', 'U', 'I', 'E', 'S']),
		new Die(['E', 'V', 'L', 'E', 'Y', 'D']),
		new Die(['O', 'T', 'W', 'A', 'T', 'O']),
		new Die(['P', 'K', 'A', 'F', 'S', 'F']),
		new Die(['H', 'Z', 'L', 'R', 'N', 'N']),
		new Die(['A', 'J', 'B', 'O', 'B', 'O']),
		new Die(['D', 'S', 'Y', 'I', 'T', 'T']),
		new Die(['C', 'T', 'U', 'I', 'M', 'O']),
		new Die(['L', 'R', 'Y', 'T', 'T', 'E']),
		new Die(['E', 'A', 'N', 'A', 'E', 'G']),
		new Die(['E', 'D', 'L', 'X', 'R', 'I'])
	);

	function randomizeDice(dice) {
		// Helper function
		// Randomize an array order
		// Used to shuffle the dice before displaying them
		//Thank you: http://firelitdesign.blogspot.com/2011/08/javascript-array-scrambling.html
		function mixArray(arrayIn) {
			var arrayOut = [];
			var origLength = arrayIn.length;
			for (var x = 0; x < origLength; x++) {
				var randIndex = Math.floor(Math.random() * arrayIn.length);
				if (randIndex == arrayIn.length) randIndex--;
				arrayOut.push(arrayIn.splice(randIndex, 1)[0]);
			}
			return arrayOut;
		};

		$.each(dice, function () {
			this.roll();
		});

		dice = mixArray(dice);

		return dice;
	}

	function rotateCW() {
		var newDice = new Array();
		newDice.push(this.dice[12]);
		newDice.push(this.dice[8]);
		newDice.push(this.dice[4]);
		newDice.push(this.dice[0]);
		newDice.push(this.dice[13]);
		newDice.push(this.dice[9]);
		newDice.push(this.dice[5]);
		newDice.push(this.dice[1]);
		newDice.push(this.dice[14]);
		newDice.push(this.dice[10]);
		newDice.push(this.dice[6]);
		newDice.push(this.dice[2]);
		newDice.push(this.dice[15]);
		newDice.push(this.dice[11]);
		newDice.push(this.dice[7]);
		newDice.push(this.dice[3]);
		this.dice = newDice;
		this.displayDiceOnForm(this.dice);
	}

	function rotateCCW() {
		var newDice = new Array();
		newDice.push(this.dice[3]);
		newDice.push(this.dice[7]);
		newDice.push(this.dice[11]);
		newDice.push(this.dice[15]);
		newDice.push(this.dice[2]);
		newDice.push(this.dice[6]);
		newDice.push(this.dice[10]);
		newDice.push(this.dice[14]);
		newDice.push(this.dice[1]);
		newDice.push(this.dice[5]);
		newDice.push(this.dice[9]);
		newDice.push(this.dice[13]);
		newDice.push(this.dice[0]);
		newDice.push(this.dice[4]);
		newDice.push(this.dice[8]);
		newDice.push(this.dice[12]);
		this.dice = newDice;
		this.displayDiceOnForm(this.dice);
	}

	function rollDiceMultipleTimes(numberOfRolls) {
		if (numberOfRolls > 0) {
			this.dice = randomizeDice(this.dice);
			this.displayDiceOnForm(this.dice);
			numberOfRolls--;
			if (numberOfRolls > 0) {
				setTimeout('game.round.board.rollDiceMultipleTimes(' + numberOfRolls + ')', DELAY_BETWEEN_ROLLS);
			}
		}
	}

	function toggleDiceVisible() {
		$('[id^="die"]').toggleClass('dice-hidden');
	}

	function displayDiceOnForm(dice) {
		$.each(dice, function (idx, die) {
			$('#die' + idx).val(die.faceUp);
		});
	}

	return {
		diceHidden: diceHidden,
		dice: dice,
		rotateCW: rotateCW,
		rotateCCW: rotateCCW,
		rollDiceMultipleTimes: rollDiceMultipleTimes,
		toggleDiceVisible: toggleDiceVisible,
		displayDiceOnForm: displayDiceOnForm
	};
};

//*******************************************
// Round class
//*******************************************
function Round() {
	var newRound = true;
	var board = new Board();

	function startRound(isNewRound) {
		this.newRound = false;
		$('#btnStart').attr('disabled', 'true');

		if (isNewRound) {
			this.board.rollDiceMultipleTimes(NUMBER_OF_ROLLS);
			setTimeout("$('#divNewTimer').countdown('resume')", NUMBER_OF_ROLLS * DELAY_BETWEEN_ROLLS + 1000);
		}
		else {
			$('#divNewTimer').countdown('resume')
		}

		$('#btnPause').removeAttr('disabled');
		$('#btnStop').removeAttr('disabled');

		if (board.diceHidden) {
			board.toggleDiceVisible();
			board.diceHidden = false;
		}
	}

	function pauseRound() {
		$('#btnStart').removeAttr('disabled');
		$('#btnPause').attr('disabled', 'true');

		if (!board.diceHidden) {
			board.toggleDiceVisible();
			board.diceHidden = true;
		}

		$('#divNewTimer').countdown('pause');
	}

	return {
		board: board,
		startRound: startRound,
		pauseRound: pauseRound
	};
};

//******************************************
// Game class
//******************************************
function Game() {
	var gameID = 0;
	var round = new Round();

	function initNewRound() {
		$('#btnStart').removeAttr('disabled');
		$('#btnPause').attr('disabled', 'true');
		$('#btnStop').attr('disabled', 'true');
		this.round.newRound = true;

		if (round.board.diceHidden) {
			round.board.toggleDiceVisible();
			round.board.diceHidden = false;
		}

		$('#divNewTimer').countdown('destroy');

		$('#divNewTimer').countdown({
			until: BASE_SECONDS_IN_ROUND,
			format: 'MS',
			layout: '{mn}:{snn}',
			onExpiry: function () { alert('Round is over.'); $('#btnPause').attr('disabled', 'true'); }
		}).countdown('pause');
	}

	return {
		gameID: gameID,
		round: round,
		initNewRound: initNewRound
	};
};

//*****************************************
// Utility class
//  various utility functions
//*****************************************
function Utility() {

	function clearTextBox() {
		$('#txtResults').val('');
	}

	////**********************************************************************************
	// SEE: http://forum.jquery.com/topic/jquery-ajax-and-xml-issues-no-element-found
	//   for workaround on how to use AJAX for off-domain queries
	//**********************************************************************************
	function lookupWord() {
		var word = $('#txtWordToFind').val().toLowerCase();
		var url = './xmlparse.asp?word=' + word;
		$.ajax({
			type: "GET",
			url: url,
			dataType: "xml",
			success: LookupWordResults
		});

		function LookupWordResults(xml) {
			if ($(xml).find("entry").length > 0) {
				$('#txtResults').val(':-)');
			}
			else {
				$('#txtResults').val(':-(');
			}
		}
	}

	return {
		clearTextBox: clearTextBox,
		lookupWord: lookupWord
	};
};