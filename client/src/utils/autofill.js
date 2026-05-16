import axios from 'axios';

function fillReactInput(element, value) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  ).set;

  setter.call(element, value);

  element.dispatchEvent(
    new Event('input', {
      bubbles: true
    })
  );

  element.dispatchEvent(
    new Event('change', {
      bubbles: true
    })
  );
}

export async function autofillForm() {
  const resume = JSON.parse(
    localStorage.getItem('resume')
  );

  const inputs = document.querySelectorAll(
    'input, textarea'
  );

   for (const input of inputs) {
    const label =
      input.getAttribute('aria-label') ||
      input.placeholder ||
      input.name;

    const response = await axios.post(
      'http://localhost:5000/api/ai/map',
      {
        label,
        resume
      }
    );

    const mapping = response.data;

    if (mapping.confidence > 0.7) {
      fillReactInput(input, mapping.value);
    }
  }
}