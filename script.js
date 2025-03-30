document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cooperateButton = document.querySelector('#cooperate .choice-button');
    const betrayButton = document.querySelector('#betray .choice-button');
    const roundCounter = document.getElementById('round-counter');
    const playerScoreDisplay = document.getElementById('player-score');
    const opponentScoreDisplay = document.getElementById('opponent-score');
    const gameHistoryTable = document.getElementById('game-history').querySelector('tbody');
    const gameOverDiv = document.getElementById('game-over');
    const finalMessage = document.getElementById('final-message');
    const playAgainButton = document.getElementById('play-again');

    // Variables del juego
    let currentRound = 1;
    const maxRounds = 6;
    let playerScore = 0;
    let opponentScore = 0;
    let playerLastChoice = null;
    let gameHistory = [];

    // Matriz de puntuación del dilema del prisionero
    // [player choice][opponent choice] => [player points, opponent points]
    const scoreMatrix = {
        'cooperar': {
            'cooperar': [3, 3], // Ambos cooperan: 3 puntos cada uno
            'traicionar': [0, 5] // Jugador coopera, oponente traiciona: 0 para jugador, 5 para oponente
        },
        'traicionar': {
            'cooperar': [5, 0], // Jugador traiciona, oponente coopera: 5 para jugador, 0 para oponente
            'traicionar': [1, 1]  // Ambos traicionan: 1 punto cada uno
        }
    };

    // Inicializar el juego
    function initGame() {
        currentRound = 1;
        playerScore = 0;
        opponentScore = 0;
        playerLastChoice = null;
        gameHistory = [];
        
        roundCounter.textContent = `Ronda ${currentRound} de ${maxRounds}`;
        playerScoreDisplay.textContent = playerScore;
        opponentScoreDisplay.textContent = opponentScore;
        
        gameHistoryTable.innerHTML = '';
        gameOverDiv.classList.add('hidden');
        
        enableButtons();
    }

    // Función para procesar la elección del jugador
    function processChoice(playerChoice) {
        // En la primera ronda, el adversario siempre coopera
        // En las siguientes, copia la última elección del jugador
        let opponentChoice;
        
        if (currentRound === 1) {
            opponentChoice = 'cooperar';
        } else {
            opponentChoice = playerLastChoice;
        }
        
        // Calcular puntos según la matriz de puntuación
        const [playerPoints, opponentPoints] = scoreMatrix[playerChoice][opponentChoice];
        
        // Actualizar puntuaciones
        playerScore += playerPoints;
        opponentScore += opponentPoints;
        
        // Actualizar la interfaz
        playerScoreDisplay.textContent = playerScore;
        opponentScoreDisplay.textContent = opponentScore;
        
        // Guardar la elección para la próxima ronda
        playerLastChoice = playerChoice;
        
        // Agregar la ronda al historial
        addToHistory(currentRound, playerChoice, opponentChoice, playerPoints, opponentPoints, playerScore, opponentScore);
        
        // Avanzar a la siguiente ronda o finalizar el juego
        currentRound++;
        
        if (currentRound <= maxRounds) {
            roundCounter.textContent = `Ronda ${currentRound} de ${maxRounds}`;
        } else {
            endGame();
        }
    }
    
    // Función para agregar una ronda al historial
    function addToHistory(round, playerChoice, opponentChoice, playerPoints, opponentPoints, playerAccPoints, opponentAccPoints) {
        const row = document.createElement('tr');
        row.classList.add('highlight');
        
        // Iconos para las elecciones
        const playerIcon = playerChoice === 'cooperar' 
            ? '<i class="fas fa-handshake cooperate-icon"></i>' 
            : '<i class="fas fa-user-ninja betray-icon"></i>';
            
        const opponentIcon = opponentChoice === 'cooperar' 
            ? '<i class="fas fa-handshake cooperate-icon"></i>' 
            : '<i class="fas fa-user-ninja betray-icon"></i>';
        
        row.innerHTML = `
            <td>${round}</td>
            <td>${playerIcon} ${playerChoice}</td>
            <td>${opponentIcon} ${opponentChoice}</td>
            <td>${playerPoints}</td>
            <td>${playerAccPoints}</td>
            <td>${opponentPoints}</td>
            <td>${opponentAccPoints}</td>
        `;
        
        gameHistoryTable.appendChild(row);
        
        // Guardar en el array de historial
        gameHistory.push({
            round,
            playerChoice,
            opponentChoice,
            playerPoints,
            opponentPoints,
            playerAccPoints,
            opponentAccPoints
        });
    }
    
    // Función para finalizar el juego
    function endGame() {
        disableButtons();
        
        let message;
        if (playerScore > opponentScore) {
            message = `¡Felicidades! Has ganado con ${playerScore} puntos contra ${opponentScore} puntos del adversario.`;
        } else if (playerScore < opponentScore) {
            message = `Has perdido. Tu puntuación fue de ${playerScore} puntos contra ${opponentScore} puntos del adversario.`;
        } else {
            message = `¡Empate! Ambos han obtenido ${playerScore} puntos.`;
        }
        
        finalMessage.textContent = message;
        gameOverDiv.classList.remove('hidden');
    }
    
    // Habilitar/deshabilitar botones
    function disableButtons() {
        cooperateButton.disabled = true;
        betrayButton.disabled = true;
        cooperateButton.style.opacity = 0.5;
        betrayButton.style.opacity = 0.5;
    }
    
    function enableButtons() {
        cooperateButton.disabled = false;
        betrayButton.disabled = false;
        cooperateButton.style.opacity = 1;
        betrayButton.style.opacity = 1;
    }
    
    // Event Listeners
    cooperateButton.addEventListener('click', function() {
        processChoice('cooperar');
    });
    
    betrayButton.addEventListener('click', function() {
        processChoice('traicionar');
    });
    
    playAgainButton.addEventListener('click', initGame);
    
    // Iniciar el juego
    initGame();
}); 