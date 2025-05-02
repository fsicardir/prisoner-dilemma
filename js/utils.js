// Utility functions for data collection and processing

// Function to get form data from a form element
export function getFormData(formElement) {
  const formData = new FormData(formElement);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    // Handle checkbox groups by creating arrays
    if (key.includes('[]')) {
      const cleanKey = key.replace('[]', '');
      if (!data[cleanKey]) {
        data[cleanKey] = [];
      }
      data[cleanKey].push(value);
    } else {
      data[key] = value;
    }
  }
  
  return data;
}

// Function to collect all questionnaire responses
export function collectAllResponses() {
  // Get consent data
  const consentForm = document.getElementById('consent-form');
  const consentData = getFormData(consentForm);
  
  // Get sociodemographic data
  const sociodemograficForm = document.getElementById('sociodemografico-form');
  const sociodemograficData = getFormData(sociodemograficForm);
  
  // Get IRI data
  const iriForm = document.getElementById('iri-form');
  const iriData = getFormData(iriForm);
  
  // Get MDMQ data
  const mdmqForm = document.getElementById('mdmq-form');
  const mdmqData = getFormData(mdmqForm);
  
  return {
    consent: consentData,
    sociodemografico: sociodemograficData,
    iri: iriData,
    mdmq: mdmqData
  };
} 