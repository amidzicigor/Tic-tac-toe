// Need to impliment:
  // AI


// Bugs
	// Can click X or O buttons after game has started

var moveChosen = false;
var userChoice;
var computerChoice;
var currentMove;
var moveCounter = 0;
var arrayOfOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Change the current move after every turn
var checkCurrentMove = function () {
	if (moveCounter > 0) {
  	if (currentMove === "X") {
      currentMove = "O";
    } else if (currentMove === 'O') {
      currentMove = 'X';
    }
  }
}

var removeChoiceOption = function () {
	$('#messageArea').text('');
}
var returnChoiceOption = function () {
	location.reload();
}

// Remove playable boxes from arrayOfOptions
var updateArray = function () {
	for (var i = 0; i < arrayOfOptions.length; i++) {
		if ($(`#${arrayOfOptions[i]}`).text()) {
			var numToSplice = arrayOfOptions.indexOf(arrayOfOptions[i]);
			arrayOfOptions.splice(numToSplice, 1);
		}
	}
	console.log(arrayOfOptions);
}

// -------------------------- AI functionality ------------------------------ //
var computerMove = function () {
	var randomTimeout = Math.floor(Math.random() * 3000) + 1000;
	var randomNum = Math.floor(Math.random() * arrayOfOptions.length);
	setTimeout(function () {
		checkCurrentMove();
		moveCounter++;
		$(`#${arrayOfOptions[randomNum]}`).html(currentMove);
		updateArray();
		checkWin();
		console.log(randomNum);
	}, randomTimeout);
}
// ------------------------ End AI functionality ---------------------------- //

// ---------------------------- Check Winner -------------------------------- //
function checkWin() {

	var topLeft = $('#1').text();
	var topMid = $('#2').text();
	var topRight = $('#3').text();
	var midLeft = $('#4').text();
	var midMid = $('#5').text();
	var midRight = $('#6').text();
	var botLeft = $('#7').text();
	var botMid = $('#8').text();
	var botRight = $('#9').text();

	// Check row wins
	if (topLeft === 'X' && topMid === 'X' && topRight === 'X') {
		alert ("Winner is X!");
		resetBoard();
	} else if (midLeft === 'X' && midMid === 'X' && midRight === 'X') {
		alert ("Winner is X!");
		resetBoard();
	} else if (botLeft === 'X' && botMid === 'X' && botRight === 'X') {
		alert ("Winner is X!");
		resetBoard();
	}
	// Check col wins
	else if (topLeft === 'X' && midLeft === 'X' && botLeft === 'X') {
		alert ("Winner is X!");
		resetBoard();
	} else if (topMid === 'X' && midMid === 'X' && botMid === 'X') {
		alert ("Winner is X!");
		resetBoard();
	} else if (topRight === 'X' && botMid === 'X' && botRight === 'X') {
		alert ("Winner is X!");
		resetBoard();
	}
	// Check diag wins
	else if (topLeft === 'X' && midMid === 'X' && botRight === 'X'){
		alert ("Winner is X!");
		resetBoard();
	} else if (topRight === 'X' && midMid === 'X' && botLeft === 'X'){
		alert ("Winner is X!");
		resetBoard();
	}
	// Check row wins O
	else if (topLeft === 'O' && topMid === 'O' && topRight === 'O') {
		alert ("Winner is O!");
		resetBoard();
	} else if (midLeft === 'O' && midMid === 'O' && midRight === 'O') {
		alert ("Winner is O!");
		resetBoard();
	} else if (botLeft === 'O' && botMid === 'O' && botRight === 'O') {
		alert ("Winner is O!");
		resetBoard();
	}
	// Check col wins
	else if (topLeft === 'O' && midLeft === 'O' && botLeft === 'O') {
		alert ("Winner is O!");
		resetBoard();
	} else if (topMid === 'O' && midMid === 'O' && botMid === 'O') {
		alert ("Winner is O!");
		resetBoard();
	} else if (topRight === 'O' && midRight === 'O' && botRight === 'O') {
		alert ("Winner is O!");
		resetBoard();
	}
	// Check diag wins
	else if (topLeft === 'O' && midMid === 'O' && botRight === 'O'){
		alert ("Winner is O!");
	} else if (topRight === 'O' && midMid === 'O' && botLeft === 'O'){
		alert ("Winner is O!");
	}
}
// -------------------------- End Check Winner ------------------------------ //

// Reset the board by reloading page
var resetBoard = function () {
  returnChoiceOption();
}


$(document).ready(function(){

	// Pick between X or O buttons
	$('#buttonX').click(function(){
      userChoice = 'X';
      computerChoice = 'O';
      currentMove = userChoice;
      alert("You are " + userChoice);
      removeChoiceOption();
  });
  $('#buttonO').click(function(){
      userChoice = 'O';
      computerChoice = 'X';
      currentMove = userChoice;
      alert("You are " + userChoice);
      removeChoiceOption();
  });

  // When box is click, change inner HTML
  $('.box').click(function(){
  	checkCurrentMove();
    moveCounter++;
  	$(this).html(currentMove);
		updateArray();
		computerMove();
    checkWin();
  })
  // Reset board
  $('#resetButton').click(function(){
  	resetBoard();
  });
})
