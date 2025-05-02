import { elements, isMobile, showSection } from './dom.js';
import { SCORE_MATRIX, MAX_ROUNDS } from './constants.js';
import { saveUserResponses } from './firebase-config.js';
import { collectAllResponses } from './utils.js';

// Game state
let currentRound = 1;
let playerScore = 0;
let opponentScore = 0;
let playerLastChoice = null;
let gameHistory = [];
let roundStartTime = null;
let gameStartTime = null;
let totalGameTime = 0;

// Initialize the game
export function initGame() {
    currentRound = 1;
    playerScore = 0;
    opponentScore = 0;
    playerLastChoice = null;
    gameHistory = [];
    gameStartTime = Date.now();
    totalGameTime = 0;
    
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
    
    // If setupTooltips is in the window object, call it
    if (typeof window.setupTooltips === 'function') {
        window.setupTooltips();
    }
}

// Process player's choice
export function processChoice(playerChoice) {
    // Disable buttons to prevent multiple clicks
    disableButtons();
    
    // Calculate time taken for this round
    const roundEndTime = Date.now();
    const timeTaken = (roundEndTime - roundStartTime) / 1000; // Convert to seconds
    totalGameTime += timeTaken;
    
    // Determine opponent's choice: cooperate in first round, then copy player's last move
    let opponentChoice;
    if (currentRound === 1) {
        opponentChoice = 'cooperar'; // Always cooperate in first round
    } else {
        opponentChoice = playerLastChoice; // Copy player's previous move
    }
    
    // Store player's choice for next round
    playerLastChoice = playerChoice;
    
    // Get scores from matrix
    const [playerPoints, opponentPoints] = SCORE_MATRIX[playerChoice][opponentChoice];
    
    // Update scores
    playerScore += playerPoints;
    opponentScore += opponentPoints;
    
    // Update displays
    elements.game.playerScoreDisplay.textContent = playerScore;
    elements.game.opponentScoreDisplay.textContent = opponentScore;
    
    // Record in game history
    const roundData = {
        round: currentRound,
        playerChoice,
        opponentChoice,
        playerPoints,
        opponentPoints,
        timeTaken
    };
    
    gameHistory.push(roundData);
    
    // Add to history table
    addToHistory(currentRound, playerChoice, opponentChoice, playerPoints, opponentPoints, timeTaken);
    
    // Check if game is over
    if (currentRound >= MAX_ROUNDS) {
        endGame();
    } else {
        currentRound++;
        enableButtons();
    }
}

// Add round to history
function addToHistory(round, playerChoice, opponentChoice, playerPoints, opponentPoints, timeTaken) {
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
async function endGame() {
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
        elements.game.continueButton.addEventListener('click', async () => {
            // Change button to loading state
            const originalText = elements.game.continueButton.textContent;
            elements.game.continueButton.disabled = true;
            elements.game.continueButton.textContent = 'Guardando...';
            
            try {
                // Save user data to Firestore
                await saveUserData();
                // Navigate to the next section
                showSection('agradecimiento');
            } catch (error) {
                console.error("Error saving user data:", error);
                alert("Error al guardar los datos. Intente nuevamente.");
                // Restore button to original state
                elements.game.continueButton.disabled = false;
                elements.game.continueButton.textContent = originalText;
            }
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

// Save user data to Firestore
async function saveUserData() {
    try {
        // Collect form responses (already flattened)
        const questionnaireResponses = collectAllResponses();
        
        // Add game data with prefixes
        questionnaireResponses['game_playerFinalScore'] = playerScore;
        questionnaireResponses['game_opponentFinalScore'] = opponentScore;
        questionnaireResponses['game_totalGameTime'] = totalGameTime;
        questionnaireResponses['game_timestamp'] = new Date().toISOString();
        questionnaireResponses['submittedAt'] = new Date().toISOString();
        
        // Add game history as separate rows with prefixes
        gameHistory.forEach((round, index) => {
            questionnaireResponses[`game_history_${index+1}_round`] = round.round;
            questionnaireResponses[`game_history_${index+1}_playerChoice`] = round.playerChoice;
            questionnaireResponses[`game_history_${index+1}_opponentChoice`] = round.opponentChoice;
            questionnaireResponses[`game_history_${index+1}_playerPoints`] = round.playerPoints;
            questionnaireResponses[`game_history_${index+1}_opponentPoints`] = round.opponentPoints;
            questionnaireResponses[`game_history_${index+1}_timeTaken`] = round.timeTaken;
        });
        
        // Save to Firestore
        await saveUserResponses(questionnaireResponses);
        console.log("User data saved successfully");
    } catch (error) {
        console.error("Error saving user data:", error);
        throw error; // Re-throw to be handled by caller
    }
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
    // Start the timer for this round
    roundStartTime = Date.now();
    
    if (isMobile) {
        elements.game.cooperateButton.disabled = false;
        elements.game.betrayButton.disabled = false;
    } else {
        elements.game.cooperateDesktopButton.disabled = false;
        elements.game.betrayDesktopButton.disabled = false;
    }
} 