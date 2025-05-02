import { elements, showSection } from './dom.js';
import { initGame, processChoice } from './game.js';
import { generateIRIQuestions, generateMDMQQuestions } from './forms.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Generate questions
    generateIRIQuestions();
    generateMDMQQuestions();

    // Event Listeners for consent
    elements.consentButtons.accept.addEventListener('click', () => {
        showSection('sociodemografico');
    });

    elements.consentButtons.reject.addEventListener('click', () => {
        showSection('agradecimiento');
    });

    // Event Listeners for forms
    elements.forms.sociodemografico.addEventListener('submit', (e) => {
        e.preventDefault();
        showSection('iri');
    });

    elements.forms.iri.addEventListener('submit', (e) => {
        e.preventDefault();
        showSection('mdmq');
    });

    elements.forms.mdmq.addEventListener('submit', (e) => {
        e.preventDefault();
        showSection('explicacion-actividad');
    });

    // Game event listeners
    elements.game.startButton.addEventListener('click', () => {
        showSection('juego');
        initGame();
    });

    // Choice buttons event listeners
    elements.game.cooperateButton.addEventListener('click', () => processChoice('cooperar'));
    elements.game.betrayButton.addEventListener('click', () => processChoice('traicionar'));
    elements.game.cooperateDesktopButton.addEventListener('click', () => processChoice('cooperar'));
    elements.game.betrayDesktopButton.addEventListener('click', () => processChoice('traicionar'));
}); 