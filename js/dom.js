// DOM Elements
export const elements = {
    sections: document.querySelectorAll('.section'),
    consentButtons: {
        accept: document.getElementById('accept-consent'),
        reject: document.getElementById('reject-consent')
    },
    forms: {
        consent: document.getElementById('consent-form'),
        sociodemografico: document.getElementById('sociodemografico-form'),
        iri: document.getElementById('iri-form'),
        mdmq: document.getElementById('mdmq-form')
    },
    game: {
        startButton: document.getElementById('start-game'),
        playAgainButton: document.getElementById('play-again'),
        cooperateButton: document.querySelector('#cooperate .choice-button'),
        betrayButton: document.querySelector('#betray .choice-button'),
        cooperateDesktopButton: document.querySelector('#cooperate-desktop .choice-button'),
        betrayDesktopButton: document.querySelector('#betray-desktop .choice-button'),
        playerScoreDisplay: document.getElementById('player-score'),
        opponentScoreDisplay: document.getElementById('opponent-score'),
        gameHistoryTable: document.getElementById('game-history').querySelector('tbody'),
        gameHistoryFooter: document.getElementById('game-history').querySelector('tfoot'),
        gameOverDiv: document.getElementById('game-over'),
        finalMessage: document.getElementById('final-message'),
        gameArea: document.getElementById('choice-buttons'),
        desktopButtons: document.querySelector('.desktop-buttons')
    }
};

// Check if we're on a mobile device
export const isMobile = window.innerWidth < 768;

// Function to show a specific section
export function showSection(sectionId) {
    elements.sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
    
    // Scroll to the top of the page when a new section is shown
    window.scrollTo(0, 0);
} 