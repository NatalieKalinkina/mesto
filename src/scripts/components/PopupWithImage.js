import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    super.open();
    document.querySelector('.bigImagePopup__image').src = data.link;
    document.querySelector('.bigImagePopup__caption').textContent = data.name;
    document.querySelector('.bigImagePopup__image').alt = data.name;
  }
}
