import { elements, isMobile, showSection } from './dom.js';
import { SCORE_MATRIX, MAX_ROUNDS } from './constants.js';

// Game state
let currentRound = 1;
let playerScore = 0;
let opponentScore = 0;
let playerLastChoice = null;
let gameHistory = [];

// Initialize the game
export function initGame() {
    currentRound = 1;
    playerScore = 0;
    opponentScore = 0;
    playerLastChoice = null;
    gameHistory = [];
    
    elements.game.roundCounter.textContent = `Ronda ${currentRound} de ${MAX_ROUNDS}`;
    elements.game.playerScoreDisplay.textContent = playerScore;
    elements.game.opponentScoreDisplay.textContent = opponentScore;
    
    elements.game.gameHistoryTable.innerHTML = '';
    elements.game.gameHistoryFooter.innerHTML = ''; // Clear totals row
    
    // Show game buttons and hide continue button
    if (isMobile) {
        elements.game.gameArea.style.display = 'flex';
        if (elements.game.continueButton) {
            elements.game.continueButton.style.display = 'none';
        }
    } else {
        elements.game.desktopButtons.style.display = 'flex';
        if (elements.game.continueButton) {
            elements.game.continueButton.style.display = 'none';
        }
    }
    
    enableButtons();
}

// Process player's choice
export function processChoice(playerChoice) {
    // Disable buttons to prevent multiple clicks
    disableButtons();
    
    // Store player's choice
    playerLastChoice = playerChoice;
    
    // Simulate opponent's choice (for now, random)
    const opponentChoice = Math.random() < 0.5 ? 'cooperar' : 'traicionar';
    
    // Get scores from matrix
    const [playerPoints, opponentPoints] = SCORE_MATRIX[playerChoice][opponentChoice];
    
    // Update scores
    playerScore += playerPoints;
    opponentScore += opponentPoints;
    
    // Update displays
    elements.game.playerScoreDisplay.textContent = playerScore;
    elements.game.opponentScoreDisplay.textContent = opponentScore;
    
    // Add to history
    addToHistory(currentRound, playerChoice, opponentChoice, playerPoints, opponentPoints);
    
    // Check if game is over
    if (currentRound >= MAX_ROUNDS) {
        endGame();
    } else {
        currentRound++;
        elements.game.roundCounter.textContent = `Ronda ${currentRound} de ${MAX_ROUNDS}`;
        enableButtons();
    }
}

// Add round to history
function addToHistory(round, playerChoice, opponentChoice, playerPoints, opponentPoints) {
    const row = document.createElement('tr');
    
    const roundCell = document.createElement('td');
    roundCell.textContent = round;
    
    const playerCell = document.createElement('td');
    playerCell.textContent = playerChoice === 'cooperar' ? 'Cooperar' : 'Traicionar';
    
    const opponentCell = document.createElement('td');
    opponentCell.textContent = opponentChoice === 'cooperar' ? 'Cooperar' : 'Traicionar';
    
    const playerPointsCell = document.createElement('td');
    playerPointsCell.textContent = playerPoints;
    
    const opponentPointsCell = document.createElement('td');
    opponentPointsCell.textContent = opponentPoints;
    
    row.appendChild(roundCell);
    row.appendChild(playerCell);
    row.appendChild(opponentCell);
    row.appendChild(playerPointsCell);
    row.appendChild(opponentPointsCell);
    
    elements.game.gameHistoryTable.appendChild(row);
    updateTotalsRow();
}

// Update totals row in history
function updateTotalsRow() {
    elements.game.gameHistoryFooter.innerHTML = '';
    
    const row = document.createElement('tr');
    row.className = 'totals';
    
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 3;
    emptyCell.textContent = 'Total';
    
    const playerTotalCell = document.createElement('td');
    playerTotalCell.textContent = playerScore;
    
    const opponentTotalCell = document.createElement('td');
    opponentTotalCell.textContent = opponentScore;
    
    row.appendChild(emptyCell);
    row.appendChild(playerTotalCell);
    row.appendChild(opponentTotalCell);
    
    elements.game.gameHistoryFooter.appendChild(row);
}

// End the game
function endGame() {
    // Hide game buttons
    if (isMobile) {
        elements.game.gameArea.style.display = 'none';
    } else {
        elements.game.desktopButtons.style.display = 'none';
    }
    
    // Create continue button if it doesn't exist
    if (!elements.game.continueButton) {
        elements.game.continueButton = document.createElement('button');
        elements.game.continueButton.id = 'continue-button';
        elements.game.continueButton.className = 'btn';
        elements.game.continueButton.textContent = 'Continuar';
        
        // Add the button to the game area
        if (isMobile) {
            elements.game.gameArea.appendChild(elements.game.continueButton);
            elements.game.gameArea.style.display = 'flex';
        } else {
            elements.game.desktopButtons.appendChild(elements.game.continueButton);
            elements.game.desktopButtons.style.display = 'flex';
        }
        
        // Add event listener to navigate to the next section
        elements.game.continueButton.addEventListener('click', () => {
            showSection('agradecimiento');
        });
    }
    
    // Show continue button and hide game buttons
    elements.game.continueButton.style.display = 'block';
    
    // Hide all game choice buttons
    const gameButtons = document.querySelectorAll('.choice-button');
    gameButtons.forEach(button => {
        button.style.display = 'none';
    });
}

// Export the continue button element
export const continueButton = elements.game.continueButton;

// Disable game buttons
function disableButtons() {
    if (isMobile) {
        elements.game.cooperateButton.disabled = true;
        elements.game.betrayButton.disabled = true;
    } else {
        elements.game.cooperateDesktopButton.disabled = true;
        elements.game.betrayDesktopButton.disabled = true;
    }
}

// Enable game buttons
function enableButtons() {
    if (isMobile) {
        elements.game.cooperateButton.disabled = false;
        elements.game.betrayButton.disabled = false;
    } else {
        elements.game.cooperateDesktopButton.disabled = false;
        elements.game.betrayDesktopButton.disabled = false;
    }
} 