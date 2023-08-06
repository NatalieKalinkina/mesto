const cardsContainerEl = '.elements';
const cardFormEl = document.querySelector('#popup_form-add');
const profileFormEl = document.querySelector('#popup_form-edit');
const avatarFormEl = document.querySelector('#popup_form-avatar');
const nameInput = document.querySelector('.popup__text_type_name');
const aboutInput = document.querySelector('.popup__text_type_about');
const avatarInput = document.querySelector('.popup__text_type_avatar');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__edit-avatar');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  errorId: '-error'
};

export {
  cardsContainerEl,
  cardFormEl,
  profileFormEl,
  avatarFormEl,
  nameInput,
  aboutInput,
  avatarInput,
  editButton,
  addButton,
  avatarEditButton,
  settings
};
