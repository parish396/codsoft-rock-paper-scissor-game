// script.js

// Get references to HTML elements
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const gameResultDisplay = document.getElementById('game-result');
const choiceButtons = document.querySelectorAll('.choice-btn');
const playAgainButton = document.getElementById('play-again-btn');

// Initialize scores
let playerScore = 0;
let computerScore = 0;

// Array of possible choices
const choices = ['rock', 'paper', 'scissors'];

/**
 * Generates a random choice for the computer.
 * @returns {string} The computer's randomly selected choice.
 */
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

/**
 * Determines the winner of the round based on player and computer choices.
 * @param {string} playerChoice - The choice made by the player.
 * @param {string} computerChoice - The choice made by the computer.
 * @returns {string} The result of the round ('win', 'lose', or 'tie').
 */
function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

/**
 * Updates the score and displays the result of the round.
 * @param {string} result - The result of the round ('win', 'lose', or 'tie').
 * @param {string} playerChoice - The choice made by the player.
 * @param {string} computerChoice - The choice made by the computer.
 */
function displayResult(result, playerChoice, computerChoice) {
    // Update choice displays
    playerChoiceDisplay.textContent = `Your choice: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
    computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;

    // Update score and result message based on the outcome
    if (result === 'win') {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        gameResultDisplay.textContent = 'You Win!';
        gameResultDisplay.className = 'text-3xl font-bold text-green-600'; // Green for win
    } else if (result === 'lose') {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        gameResultDisplay.textContent = 'You Lose!';
        gameResultDisplay.className = 'text-3xl font-bold text-red-600'; // Red for lose
    } else {
        gameResultDisplay.textContent = "It's a Tie!";
        gameResultDisplay.className = 'text-3xl font-bold text-yellow-600'; // Yellow for tie
    }

    // Show the play again button after a round
    playAgainButton.classList.remove('hidden');
}

/**
 * Handles the player's choice when a button is clicked.
 * @param {Event} event - The click event object.
 */
function handlePlayerChoice(event) {
    const playerChoice = event.target.id; // Get the ID of the clicked button (rock, paper, or scissors)
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    displayResult(result, playerChoice, computerChoice);

    // Disable choice buttons after a selection
    choiceButtons.forEach(button => button.disabled = true);
}

/**
 * Resets the game state for a new round.
 */
function resetGame() {
    // Reset choice displays
    playerChoiceDisplay.textContent = 'Your choice: -';
    computerChoiceDisplay.textContent = "Computer's choice: -";
    gameResultDisplay.textContent = 'Choose your move!';
    gameResultDisplay.className = 'text-3xl font-bold text-gray-900'; // Reset color

    // Re-enable choice buttons
    choiceButtons.forEach(button => button.disabled = false);

    // Hide the play again button
    playAgainButton.classList.add('hidden');
}

// Add event listeners to the choice buttons
choiceButtons.forEach(button => {
    button.addEventListener('click', handlePlayerChoice);
});

// Add event listener to the play again button
playAgainButton.addEventListener('click', resetGame);

// Initial call to reset game state when the page loads
document.addEventListener('DOMContentLoaded', resetGame);
