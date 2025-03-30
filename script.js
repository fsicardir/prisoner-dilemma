document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cooperateButton = document.querySelector('#cooperate .choice-button');
    const betrayButton = document.querySelector('#betray .choice-button');
    const cooperateDesktopButton = document.querySelector('#cooperate-desktop .choice-button');
    const betrayDesktopButton = document.querySelector('#betray-desktop .choice-button');
    const roundCounter = document.getElementById('round-counter');
    const playerScoreDisplay = document.getElementById('player-score');
    const opponentScoreDisplay = document.getElementById('opponent-score');
    const gameHistoryTable = document.getElementById('game-history').querySelector('tbody');
    const gameHistoryFooter = document.getElementById('game-history').querySelector('tfoot');
    const gameOverDiv = document.getElementById('game-over');
    const finalMessage = document.getElementById('final-message');
    const playAgainButton = document.getElementById('play-again');
    const gameArea = document.getElementById('choice-buttons');
    const desktopButtons = document.querySelector('.desktop-buttons');

    // Variables del juego
    let currentRound = 1;
    const maxRounds = 6;
    let playerScore = 0;
    let opponentScore = 0;
    let playerLastChoice = null;
    let gameHistory = [];

    // Comprobar si estamos en un dispositivo móvil
    const isMobile = window.innerWidth < 768;

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
        gameHistoryFooter.innerHTML = ''; // Limpiar la fila de totales
        gameOverDiv.classList.add('hidden');
        
        enableButtons();
        
        // En móvil, asegurarnos de que los botones sean visibles
        if (isMobile) {
            gameArea.style.display = 'flex';
            desktopButtons.style.display = 'none';
            
            // Scroll al top después de iniciar un nuevo juego
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            desktopButtons.style.display = 'flex';
            gameArea.style.display = 'none';
        }
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
        addToHistory(currentRound, playerChoice, opponentChoice, playerPoints, opponentPoints);
        
        // Actualizar la fila de totales
        updateTotalsRow();
        
        // Avanzar a la siguiente ronda o finalizar el juego
        currentRound++;
        
        if (currentRound <= maxRounds) {
            roundCounter.textContent = `Ronda ${currentRound} de ${maxRounds}`;
        } else {
            endGame();
        }
    }
    
    // Función para agregar una ronda al historial
    function addToHistory(round, playerChoice, opponentChoice, playerPoints, opponentPoints) {
        const row = document.createElement('tr');
        row.classList.add('highlight');
        
        // Iconos para las elecciones - Más pequeños para móvil
        const playerIcon = playerChoice === 'cooperar' 
            ? '<i class="fas fa-handshake cooperate-icon"></i>' 
            : '<i class="fas fa-user-ninja betray-icon"></i>';
            
        const opponentIcon = opponentChoice === 'cooperar' 
            ? '<i class="fas fa-handshake cooperate-icon"></i>' 
            : '<i class="fas fa-user-ninja betray-icon"></i>';
        
        // En móvil, no mostramos las palabras, solo los iconos
        const playerChoiceDisplay = isMobile 
            ? playerIcon 
            : `${playerIcon} ${playerChoice}`;
            
        const opponentChoiceDisplay = isMobile 
            ? opponentIcon 
            : `${opponentIcon} ${opponentChoice}`;
        
        row.innerHTML = `
            <td>${round}</td>
            <td>${playerChoiceDisplay}</td>
            <td>${opponentChoiceDisplay}</td>
            <td>${playerPoints}</td>
            <td>${opponentPoints}</td>
        `;
        
        gameHistoryTable.appendChild(row);
        
        // En móvil, hacer scroll automático a la tabla para ver la nueva fila
        if (isMobile) {
            setTimeout(() => {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
        
        // Guardar en el array de historial
        gameHistory.push({
            round,
            playerChoice,
            opponentChoice,
            playerPoints,
            opponentPoints
        });
    }
    
    // Función para actualizar la fila de totales
    function updateTotalsRow() {
        // Limpiar el footer
        gameHistoryFooter.innerHTML = '';
        
        // Crear la fila de totales
        const totalRow = document.createElement('tr');
        
        totalRow.innerHTML = `
            <td colspan="3">Total</td>
            <td>${playerScore}</td>
            <td>${opponentScore}</td>
        `;
        
        gameHistoryFooter.appendChild(totalRow);
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
        // Deshabilitar botones móviles
        cooperateButton.disabled = true;
        betrayButton.disabled = true;
        cooperateButton.style.opacity = 0.5;
        betrayButton.style.opacity = 0.5;
        
        // Deshabilitar botones de escritorio
        cooperateDesktopButton.disabled = true;
        betrayDesktopButton.disabled = true;
        cooperateDesktopButton.style.opacity = 0.5;
        betrayDesktopButton.style.opacity = 0.5;
    }
    
    function enableButtons() {
        // Habilitar botones móviles
        cooperateButton.disabled = false;
        betrayButton.disabled = false;
        cooperateButton.style.opacity = 1;
        betrayButton.style.opacity = 1;
        
        // Habilitar botones de escritorio
        cooperateDesktopButton.disabled = false;
        betrayDesktopButton.disabled = false;
        cooperateDesktopButton.style.opacity = 1;
        betrayDesktopButton.style.opacity = 1;
    }
    
    // Event Listeners para botones móviles
    cooperateButton.addEventListener('click', function() {
        processChoice('cooperar');
    });
    
    betrayButton.addEventListener('click', function() {
        processChoice('traicionar');
    });
    
    // Event Listeners para botones de escritorio
    cooperateDesktopButton.addEventListener('click', function() {
        processChoice('cooperar');
    });
    
    betrayDesktopButton.addEventListener('click', function() {
        processChoice('traicionar');
    });
    
    playAgainButton.addEventListener('click', initGame);
    
    // Manejar cambio de orientación en móviles
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth < 768;
        
        // Solo actualizar si el estado de móvil ha cambiado
        if (newIsMobile !== isMobile) {
            location.reload(); // La forma más sencilla de aplicar todos los cambios es recargar
        }
    });
    
    // Iniciar el juego
    initGame();
}); 