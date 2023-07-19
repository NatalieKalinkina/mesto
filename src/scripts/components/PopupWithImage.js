import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._bigImage = this._popup.querySelector('.bigImagePopup__image');
    this._bigCaption = this._popup.querySelector('.bigImagePopup__caption');

  }

  open(data) {
    super.open();
    this._bigImage.src = data.link;
    this._bigCaption.textContent = data.name;
    this._bigImage.alt = data.name;
  }
}
