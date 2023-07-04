import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const template = document.querySelector('#card-template');
const templateContent = template.content;
const cardEl = templateContent.querySelector('.card');
const cardsContainerEl = document.querySelector('.elements');
const cardFormEl = document.querySelector('#popup_form-add');
const popupProfile = document.querySelector('#popup_profile');
const popupAddCard = document.querySelector('#popup_image');
const bigImageEl = document.querySelector('.bigImagePopup__image');
const bigCaptionEl = document.querySelector('.bigImagePopup__caption');
const popupBigImage = document.querySelector('#popup_image-big');
const imageNameInput = document.querySelector('.popup__text_type_image-name');
const imageSrcInput = document.querySelector('.popup__text_type_image-src');
const profileFormEl = document.querySelector('#popup_form-edit');
const popupList = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileSubmitButton = document.querySelector('#profile-submit-button');
const imageSubmitButton = document.querySelector('#image-submit-button');
const closeButtons = document.querySelectorAll('.popup__close-button');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

  document.querySelector('.elements').append(cardElement);
});

function openPopup(popupList) {
  popupList.classList.add('popup_opened');
  document.body.addEventListener('keydown', closeByEsc);
  document.querySelector('.popup_opened').addEventListener('click', closeByOverlay);
}

function closePopup(popupList) {
  document.body.removeEventListener('keydown', closeByEsc);
  document.querySelector('.popup_opened').removeEventListener('click', closeByOverlay);
  popupList.classList.remove('popup_opened');
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target);
  }
}

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
  document.querySelector('.elements').prepend(cardElement);

  closePopup(popupAddCard);
});

profileFormEl.addEventListener('submit', submitProfileForm);

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  profileFormValidate._hideInputError(nameInput);
  profileFormValidate._hideInputError(jobInput);
  profileSubmitButton.classList.remove('popup__submit-button_inactive');
  profileSubmitButton.removeAttribute('disabled');
});

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardFormEl.reset();
  cardFormValidate._hideInputError(imageSrcInput);
  cardFormValidate._hideInputError(imageNameInput);
  imageSubmitButton.classList.add('popup__submit-button_inactive');
  imageSubmitButton.setAttribute('disabled', true);
});

closeButtons.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const profileFormValidate = new FormValidator(settings, profileFormEl);
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(settings, cardFormEl);
cardFormValidate.enableValidation();
