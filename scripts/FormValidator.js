export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(selectors.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._selectors.inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id + this._selectors.errorId}`
    );
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._selectors.inputErrorClass);
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id + this._selectors.errorId}`
    );
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  resetError() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  activateSubmitButton() {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'true');
  }

  deactivateSubmitButton() {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.activateSubmitButton();
    } else {
      this.deactivateSubmitButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
