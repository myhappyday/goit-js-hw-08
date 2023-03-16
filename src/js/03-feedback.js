import throttle from "lodash.throttle";

const STORAGE_KEY = "feedback-form-state";
const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector(".feedback-form input");
const messageInput = form.querySelector(".feedback-form textarea");

form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onFormInput, 500));

populateFormData();

function onFormSubmit(event) {
  event.preventDefault();
  if (emailInput.value && messageInput.value) {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}

function onFormInput(event) {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    emailInput.value = savedFormData.email;
    messageInput.value = savedFormData.message;
  }
}
