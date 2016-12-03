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
var playerScore = 0;
var computerScore = 0;
var gamesPlayed = 0;

// Change the current move after every turn
var checkCurrentMove = function () {
	if (moveCounter > 0) {
  	if (currentMove === "X") {
      currentMove = "O";
    } else if (currentMove === "O") {
      currentMove = "X";
    }
  }
}

// Add score to user
var scoreForUser = function () {
	$('#playerScore').html(playerScore);
}
// Add score to computer
var scoreForComputer = function () {
	$('#computerScore').html(computerScore);
}

// Remove option to choose X or O and replace it with userChoice
var removeChoiceOption = function () {
	$('#messageArea').text(`You are ${userChoice}`);
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
	if (moveCounter > 0) {
		var randomTimeout = Math.floor(Math.random() * 3000) + 1000;
		var randomNum = Math.floor(Math.random() * arrayOfOptions.length);
		checkCurrentMove();
		moveCounter++;
		$(`#${arrayOfOptions[randomNum]}`).html(currentMove);
		updateArray();
		checkWin();
		console.log('after computer plays:' + arrayOfOptions);
	}
	console.log('move counter: ' + moveCounter);
}
// ------------------------ End AI functionality ---------------------------- //

// ---------------------------- Check Winner -------------------------------- //
var checkWin = function () {

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
	if (topLeft === userChoice && topMid === userChoice && topRight === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	} else if (midLeft === userChoice && midMid === userChoice && midRight === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	} else if (botLeft === userChoice && botMid === userChoice && botRight === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	}
	// Check col wins
	else if (topLeft === userChoice && midLeft === userChoice && botLeft === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	} else if (topMid === userChoice && midMid === userChoice && botMid === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	} else if (topRight === userChoice && botMid === userChoice && botRight === userChoice) {
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	}
	// Check diag wins
	else if (topLeft === userChoice && midMid === userChoice && botRight === userChoice){
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	} else if (topRight === userChoice && midMid === userChoice && botLeft === userChoice){
		gamesPlayed++;
		displayWinner(userChoice);
		playerScore++;
		scoreForUser();
		resetBoard();
	}
	// Check row wins O
	else if (topLeft === computerChoice && topMid === computerChoice && topRight === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (midLeft === computerChoice && midMid === computerChoice && midRight === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (botLeft === computerChoice && botMid === computerChoice && botRight === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	}
	// Check col wins
	else if (topLeft === computerChoice && midLeft === computerChoice && botLeft === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (topMid === computerChoice && midMid === computerChoice && botMid === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (topRight === computerChoice && midRight === computerChoice && botRight === computerChoice) {
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	}
	// Check diag wins
	else if (topLeft === computerChoice && midMid === computerChoice && botRight === computerChoice){
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (topRight === computerChoice && midMid === computerChoice && botLeft === computerChoice){
		gamesPlayed++;
		displayWinner(computerChoice);
		computerScore++;
		scoreForComputer();
		resetBoard();
	} else if (moveCounter === 9) {
		gamesPlayed++;
		$('#displayWinner').html('It\'s a tie!');
		setTimeout(function () {
			$('#displayWinner').html('');
		}, 1500)
		resetBoard();
	}
}
// -------------------------- End Check Winner ------------------------------ //

// Display winner
var displayWinner = function (winner) {
	$('#displayWinner').html(`Winner: ${winner}`);
	setTimeout(function () {
		$('#displayWinner').html('');
	}, 1500)

}

// Reset the board by reloading page
var resetBoard = function () {
	moveChosen = false;
	moveCounter = 0;
	arrayOfOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	for (var i = 1; i <= 9; i++) {
		$(`#${i}`).html('');
	}
}


$(document).ready(function(){

	// Pick between X or O buttons
	$('#buttonX').click(function(){
      userChoice = 'X';
      computerChoice = 'O';
      currentMove = userChoice;
      removeChoiceOption();
  });
  $('#buttonO').click(function(){
      userChoice = 'O';
      computerChoice = 'X';
      currentMove = userChoice;
      removeChoiceOption();
  });

  // When box is click, change inner HTML
  $('.box').click(function(){
		if (userChoice) {
			var findThis = Number($(this).attr('id'));
			if (arrayOfOptions.indexOf(findThis) >= 0) {
		  	checkCurrentMove();
	  		$(this).html(currentMove);
				moveCounter++;
				updateArray();
		    checkWin();
				computerMove();
				updateArray();
			}
			console.log('move counter: ' + moveCounter);
		}
  })

  // Reset board
  $('#resetButton').click(function(){
		location.reload();
  });
})
