import { Card } from './Card.js';
import { initialCards } from './initialCards.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

const cardsContainerEl = document.querySelector('.elements');
const cardFormEl = document.querySelector('#popup_form-add');
const popupProfile = document.querySelector('#popup_profile');
const popupAddCard = document.querySelector('#popup_image');
const imageNameInput = document.querySelector('.popup__text_type_image-name');
const imageSrcInput = document.querySelector('.popup__text_type_image-src');
const profileFormEl = document.querySelector('#popup_form-edit');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  errorId: '-error'
};

initialCards.forEach(item => {
  const card = new Card(item, '#card-template');
  const cardElement = card.createCard();
  cardsContainerEl.append(cardElement);
});

function submitProfileForm(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
}

cardFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const item = {};
  item.name = imageNameInput.value;
  item.link = imageSrcInput.value;
  item.alt = imageNameInput.value;
  const card = new Card(item, '#card-template');
  const cardElement = card.createCard();
  cardsContainerEl.prepend(cardElement);
  closePopup(popupAddCard);
});

profileFormEl.addEventListener('submit', submitProfileForm);

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  profileFormValidate.resetError();
  profileFormValidate.deactivateSubmitButton();
});

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardFormEl.reset();
  cardFormValidate.resetError();
  cardFormValidate.activateSubmitButton();
});

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const profileFormValidate = new FormValidator(settings, profileFormEl);
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(settings, cardFormEl);
cardFormValidate.enableValidation();
