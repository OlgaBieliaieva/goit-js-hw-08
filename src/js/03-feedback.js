import Throttle from 'lodash.throttle';

const formData = {};
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
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    formRef.firstElementChild.children.email.value = savedFormData.email;
    formRef.firstElementChild.nextElementSibling.children.message.value =
      savedFormData.message;
  }
}
