import { openPopup } from './utils.js';

export class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;

    return this._element;
  }

  _likeCard() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openBigImage() {
    openPopup(document.querySelector('#popup_image-big'));
    document.querySelector('.bigImagePopup__image').src = this._link;
    document.querySelector('.bigImagePopup__caption').textContent = this._name;
    document.querySelector('.bigImagePopup__image').alt = this._name;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._likeCard();
    });

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openBigImage();
    });
  }
}
