import { Popup } from './Popup.js';

export class PopupConfirmation extends Popup {
  constructor(selector, { callback }) {
    super(selector);
    this._callback = callback;
  }

  open(card, cardId) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    document.querySelector('#confirmation-submit-button').addEventListener('click', () => {
      this._callback(this._card, this._cardId);
    });
  }
}
