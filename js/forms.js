import { elements } from './dom.js';
import { IRI_QUESTIONS, MDMQ_QUESTIONS, IRI_SCALE_OPTIONS, MDMQ_SCALE_OPTIONS } from './constants.js';

// Generate IRI questions
export function generateIRIQuestions() {
    const form = elements.forms.iri;

    IRI_QUESTIONS.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = question;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'radio-group';
        
        IRI_SCALE_OPTIONS.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `iri_${index}`;
            radio.value = optionIndex + 1;
            
            optionLabel.appendChild(radio);
            optionLabel.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(optionLabel);
        });
        
        questionDiv.appendChild(label);
        questionDiv.appendChild(optionsDiv);
        form.insertBefore(questionDiv, form.lastElementChild);
    });
}

// Generate MDMQ questions
export function generateMDMQQuestions() {
    const form = elements.forms.mdmq;

    MDMQ_QUESTIONS.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = question;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'radio-group';
        
        MDMQ_SCALE_OPTIONS.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `mdmq_${index}`;
            radio.value = optionIndex + 1;
            
            optionLabel.appendChild(radio);
            optionLabel.appendChild(document.createTextNode(option));
            optionsDiv.appendChild(optionLabel);
        });
        
        questionDiv.appendChild(label);
        questionDiv.appendChild(optionsDiv);
        form.insertBefore(questionDiv, form.lastElementChild);
    });
} 