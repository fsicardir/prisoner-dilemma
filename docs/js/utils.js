// Utility functions for data collection and processing

// Function to get form data from a form element
export function getFormData(formElement) {
  const formData = new FormData(formElement);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    // Handle checkbox groups by creating arrays
    if (key.includes('[]')) {
      const cleanKey = key.replace('[]', '');
      data[cleanKey+"_value_"+value] = true;
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
  
  // Create a flat object with prefixed keys
  const flatData = {};
  
  // Add consent data with prefix
  Object.entries(consentData).forEach(([key, value]) => {
    flatData[`consent_${key}`] = value;
  });
  
  // Add sociodemographic data with prefix
  Object.entries(sociodemograficData).forEach(([key, value]) => {
    flatData[`socio_${key}`] = value;
  });
  
  // Add IRI data with prefix
  Object.entries(iriData).forEach(([key, value]) => {
    flatData[`iri_${key}`] = value;
  });
  
  // Add MDMQ data with prefix
  Object.entries(mdmqData).forEach(([key, value]) => {
    flatData[`mdmq_${key}`] = value;
  });
  
  return flatData;
} 