//Classes
//- Die
//- Board
//- Round
//	- has a board, a timer, a round#, StartRound, PauseRound, ResetRound, PopulateBoardDisplay?
//- Game
//	- has round(s), player scores? (need players then!)
//- Timer
//- WordLookup?
//- Player

// Parameter: an array of values representing the sides of the dice
// Example: var dice1 = new Dice(['a','b','c','d','e','f']);
function Die(sides) {
	this.sides = sides;
	this.faceUp = sides[0];
	this.roll = function () {
		var x = Math.floor(Math.random() * this.sides.length);
		return this.sides[x];
	};
};


function Board() {
	this.Dice = new Array(
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

	this.RandomizeDice = function () {
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

		// Roll each die
		$.each(this.Dice, function () {
			this.faceUp = this.roll();
		});

		// Mix the dice up
		this.Dice = mixArray(this.Dice);
	};

	this.RotateCW = function () {
		var newDice = new Array();
		newDice.push(this.Dice[12]);
		newDice.push(this.Dice[8]);
		newDice.push(this.Dice[4]);
		newDice.push(this.Dice[0]);
		newDice.push(this.Dice[13]);
		newDice.push(this.Dice[9]);
		newDice.push(this.Dice[5]);
		newDice.push(this.Dice[1]);
		newDice.push(this.Dice[14]);
		newDice.push(this.Dice[10]);
		newDice.push(this.Dice[6]);
		newDice.push(this.Dice[2]);
		newDice.push(this.Dice[15]);
		newDice.push(this.Dice[11]);
		newDice.push(this.Dice[7]);
		newDice.push(this.Dice[3]);

		this.Dice = newDice;
	};

	this.RotateCCW = function () {
		var newDice = new Array();
		newDice.push(this.Dice[3]);
		newDice.push(this.Dice[7]);
		newDice.push(this.Dice[11]);
		newDice.push(this.Dice[15]);
		newDice.push(this.Dice[2]);
		newDice.push(this.Dice[6]);
		newDice.push(this.Dice[10]);
		newDice.push(this.Dice[14]);
		newDice.push(this.Dice[1]);
		newDice.push(this.Dice[5]);
		newDice.push(this.Dice[9]);
		newDice.push(this.Dice[13]);
		newDice.push(this.Dice[0]);
		newDice.push(this.Dice[4]);
		newDice.push(this.Dice[8]);
		newDice.push(this.Dice[12]);

		this.Dice = newDice;
	};
};