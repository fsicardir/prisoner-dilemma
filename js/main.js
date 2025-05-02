import { elements, showSection } from './dom.js';
import { initGame, processChoice } from './game.js';
import { generateIRIQuestions, generateMDMQQuestions } from './forms.js';
import { saveUserResponses } from './firebase-config.js';

// Function to set up tooltips with both hover and click
function setupTooltips() {
    const tooltipTrigger = document.querySelector('.tooltip-trigger');
    if (!tooltipTrigger) return;
    
    const tooltip = tooltipTrigger.querySelector('.tooltip-content');
    if (!tooltip) return;
    
    // Check if we're on a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // For mobile: use click events
        tooltipTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle show class instead of inline styles
            tooltip.classList.toggle('show');
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (!tooltipTrigger.contains(e.target)) {
                tooltip.classList.remove('show');
            }
        });
        
        // Also close on scroll (common mobile interaction)
        window.addEventListener('scroll', function() {
            tooltip.classList.remove('show');
        });
    }
}

// Make setupTooltips globally available
window.setupTooltips = setupTooltips;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Generate questions
    generateIRIQuestions();
    generateMDMQQuestions();

    // Event Listeners for consent
    elements.consentButtons.accept.addEventListener('click', () => {
        document.getElementById('consent-choice').value = 'accept';
        showSection('sociodemografico');
    });

    elements.consentButtons.reject.addEventListener('click', async () => {
        document.getElementById('consent-choice').value = 'reject';
        
        // Create empty form data but include the consent choice
        const consentData = {
            'consent-choice': 'reject'
        };
        
        // Save to Firestore with empty form data except for consent
        const userData = {
            consent: consentData,
            sociodemografico: {},
            iri: {},
            mdmq: {},
            game: {
                playerFinalScore: 0,
                opponentFinalScore: 0,
                gameHistory: [],
                totalGameTime: 0,
                timestamp: new Date().toISOString()
            },
            submittedAt: new Date().toISOString()
        };
        
        try {
            // Show loading message
            const originalText = elements.consentButtons.reject.textContent;
            elements.consentButtons.reject.disabled = true;
            elements.consentButtons.reject.textContent = 'Guardando...';
            
            // Save to Firestore
            await saveUserResponses(userData);
            console.log("User rejection data saved successfully");
            
            // Show thank you section
            showSection('agradecimiento');
        } catch (error) {
            console.error("Error saving user rejection data:", error);
            alert("Error al guardar los datos. Intente nuevamente.");
            
            // Restore button
            elements.consentButtons.reject.disabled = false;
            elements.consentButtons.reject.textContent = originalText;
        }
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

    // Setup tooltip functionality
    setupTooltips();

    // Choice buttons event listeners
    elements.game.cooperateButton.addEventListener('click', () => processChoice('cooperar'));
    elements.game.betrayButton.addEventListener('click', () => processChoice('traicionar'));
    elements.game.cooperateDesktopButton.addEventListener('click', () => processChoice('cooperar'));
    elements.game.betrayDesktopButton.addEventListener('click', () => processChoice('traicionar'));
}); 