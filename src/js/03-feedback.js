import Throttle from 'lodash.throttle';

let formData = {};
const STORAGE_KEY = 'feedback-form-state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', Throttle(onFormInputs, 500));
formRef.addEventListener('submit', onFormSubmit);

fillFormFields();

function onFormSubmit(event) {
  event.preventDefault();
  console.log(formData);
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInputs(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function fillFormFields() {
  const localeStorageData = localStorage.getItem(STORAGE_KEY);
  if (localeStorageData === null) {
    return;
  }
  try {
    formData = JSON.parse(localeStorageData);
  } catch (error) {
    console.log(error);
    return;
  }
  for (const [key, value] of Object.entries(formData)) {
    formRef[key].value = value;
  }
}
