const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add('popup__text_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__text-error_active');
};

const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove('popup__text_type_error');
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove('popup__text-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__submit-button_inactive');
    buttonElement.setAttribute('disabled', 'true');
  } else {
    buttonElement.classList.remove('popup__submit-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

const setEventListeners = formElement => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__text'));
  const buttonElement = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();
