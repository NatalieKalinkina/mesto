import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, { formSubmitCallback }) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._inputList = this._popup.querySelectorAll('.popup__text');
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__submit-button');
    this._initialButtonText = this._button.textContent;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    });
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._initialButtonText;
    }
  }
}
