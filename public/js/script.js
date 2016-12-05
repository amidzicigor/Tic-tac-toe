

/*
  Bugs
    1) FIXED --- Computer plays turn after user wins.
    2) FIXED --- 'cause of bug #1, user gets 2 points when winning instead of 1.
*/



// Variables
var userChoice;
var computerChoice;
var currentMove = userChoice;
var arrayOfOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var idOfBox = $(this).attr('id');
var currentMove;
var moveCounter = 0;
var difficulty = 1;
var winCombos = ['123', '456', '789', '147', '258', '369', '159', '357'];
var userWinArray = [];
var computerWinArray = [];
var winner;
var userScore = 0;
var computerScore = 0;

// ---------------------- Player choosing X or O ---------------------------- //
function pickXorO () {
  // Display choice at top of page
  function displayChoice () {
    $('#messageArea').html(`You are ${userChoice}`);
  }
  // Set choices for both player and computer and execute displayChoice()
  $('#buttonX').click(function () {
    userChoice = 'X';
    computerChoice = 'O';
    currentMove = userChoice;
    displayChoice();
  })
  $('#buttonO').click(function () {
    userChoice = 'O';
    computerChoice = 'X';
    currentMove = userChoice;
    displayChoice();
  })
}

// ----------------- Remove taken moves from arrayOfOptions ----------------- //
function removeFromArray (num) {
  arrayOfOptions.splice(num, 1);
}

// ---------------------- Allow user to move function ----------------------- //
function userMove () {
  $('.box').click(function () {
    // When box is clicked, check if that ID is in the arrayOfOptions array
    var idOfBox = Number($(this).attr('id'));
    var checkArray = arrayOfOptions.indexOf(idOfBox);
    var indexToDelete = checkArray;

    // If it is in the array and its the user's turn,
    // run the addHTMLUserChoice function
    if (checkArray >= 0 && currentMove === userChoice   // line break
      && !(typeof(userChoice) === 'undefined')) {

      $(this).html(userChoice);
      // Change current move to computer
      currentMove = computerChoice;
      moveCounter++;
      userWinArray.push(idOfBox);
      checkWin();
      removeFromArray(indexToDelete);
      // Run computer move
      computerMove();
    }
  })
}

// --------------------------- Computer move ------------- EASY ------------- //
function computerEasyMove () {
  if (moveCounter < 9 && !(winner)) {
    // Delay computer input to simulate 'thinking..'
    setTimeout (function () {
      // random number generator
      var randNum = Math.floor(Math.random() * arrayOfOptions.length);
      // takes random number and asigns it to a position in the array
      var idOfBox = arrayOfOptions[randNum];
      $(`#${idOfBox}`).html(computerChoice);
      currentMove = userChoice;
      moveCounter++;
      removeFromArray(randNum);
      computerWinArray.push(idOfBox);
      checkWin();
    }, 500)
  }
}

// --------------------------- Computer move ------------ Medium ------------ //
function computerMediumMove () {
  // Next update..
}

// --------------------------- Computer move ------------- Hard ------------- //
function computerMediumMove () {
  // Will do in the future, hopefully.
}

// -------------------- Allow comcputer to move function -------------------- //
function computerMove () {
  if (difficulty === 1) {
    computerEasyMove();
  } else if (difficulty === 2) {
    //computerMediumMove();
  } else if (difficulty === 3) {
    //computerHardMove();
  }
}

// ------------------------------ Game over --------------------------------- //
function gameOver () {
  if (winner === userChoice) {
    userScore++;
    $('#displayWinner').html('You win!');
  } else if (winner === computerChoice){
    computerScore++;
    $('#displayWinner').html('You lose :(');
  } else if (!(winner)) {
    $('#displayWinner').html('It\'s a tie!');
  }

	setTimeout(function () {
		$('#displayWinner').html('');
    resetBoard();
	}, 1500)
}

// ------------------------------ Check win --------------------------------- //
function checkWin () {
  for (var i = 0; i < 8; i++) {
    winCombos[i] = winCombos[i].split('');
    var userCounter = 0;
    var computerCounter = 0;
    for (var j = 0; j < 3; j++) {
      var shorten = Number(winCombos[i][j]);
      if (userWinArray.indexOf(Number(shorten)) >= 0) {
        userCounter++;
      } else if (computerWinArray.indexOf(Number(shorten)) >= 0){
        computerCounter++;
      }
    }
    if (userCounter === 3) {
      winner = userChoice;
      gameOver();
    } else if (computerCounter === 3) {
      winner = computerChoice;
      gameOver();
    } else if (moveCounter === 9) {
      gameOver();
    }
    winCombos[i] = winCombos[i].join('');
  }
}

// ----------------------------- Reset board -------------------------------- //
function resetBoard () {
  for (var i = 1; i < 10; i++) {
    $(`#${i}`).html('');
  }
  arrayOfOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  moveCounter = 0;
  winner = null;
  currentMove = userChoice;
  userWinArray = [];
  computerWinArray = [];
  $('#userScore').html(userScore);
  $('#computerScore').html(computerScore);
}

// ----------------------------- Reset button ------------------------------- //
function resetButton () {
  $('#resetButton').click(function () {
    userScore = 0;
    computerScore = 0;
    resetBoard();
  })
}

// -------------------------------- JQUERY ---------------------------------- //
$(document).ready(function () {
  pickXorO();
  userMove();
  resetButton();
})
