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

    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    if (this._likes.find(cardLike => this._userId === cardLike._id)) {
      this._likeButton.classList.add('card__like-button_active');
    }

    return this._element;
  }

  _handleLike() {
    if (this._likeButton.classList.contains('card__like-button_active')) {
      this._handleDislikeClick();
    } else {
      this._handleLikeClick();
    }
  }

  likeCard() {
    this._likeButton.classList.add('card__like-button_active');
  }

  dislikeCard() {
    this._likeButton.classList.remove('card__like-button_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  updateLikeCounter(likes) {
    this._likeCounter.textContent = likes;
  }

  _setEventListeners() {
    this._image = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    if (this._owner === this._userId) {
      this._deleteButton.addEventListener('click', () => {
        this._cardRemoving();
      });
    } else {
      this._deleteButton.remove();
    }

    this._image.addEventListener('click', () => {
      this._handleCardClick();
    });
  }
}
