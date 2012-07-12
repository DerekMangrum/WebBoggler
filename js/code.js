var BASE_SECONDS_IN_ROUND = 180;
var NUMBER_OF_ROLLS = 15;
var DELAY_BETWEEN_ROLLS = 150;

var util = new Utility();
var game = new Game();

$(document).ready(function () {
	game.initNewRound();
});

////**********************************************************************************
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