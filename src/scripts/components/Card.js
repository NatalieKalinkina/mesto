export class Card {
  constructor(
    { data, handleCardClick, cardRemoving, handleLikeClick, handleDislikeClick },
    userId,
    templateSelector
  ) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDislikeClick = handleDislikeClick;
    this._cardRemoving = cardRemoving;
    this._owner = data.owner._id;
    this._userId = userId;
    this._likes = data.likes;
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
    this._element.querySelector('.card__like-counter').textContent = this._likes.length;

    if (this._likes.find(cardLike => this._userId === cardLike._id)) {
      this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
    }

    return this._element;
  }

  _isLiked() {
    if (
      this._element
        .querySelector('.card__like-button')
        .classList.contains('card__like-button_active')
    ) {
      console.log('лайк был, теперь нет');
      this._handleDislikeClick();
    } else {
      console.log('лайка не было, теперь есть');
      this._handleLikeClick();
    }
  }

  likeCard() {
    this._element.querySelector('.card__like-button').classList.add('card__like-button_active');
  }

  dislikeCard() {
    this._element.querySelector('.card__like-button').classList.remove('card__like-button_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikeCounter(likes) {
    this._element.querySelector('.card__like-counter').textContent = likes;
  }

  _setEventListeners() {
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._isLiked();
    });

    if (this._owner === this._userId) {
      this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._cardRemoving();
      });
    } else {
      this._element.querySelector('.card__delete-button').remove();
    }

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
