import './index.css';

import { Card } from '../scripts/components/Card.js';
import { initialCards } from '../scripts/initialCards.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const cardsContainerEl = '.elements';
const cardFormEl = document.querySelector('#popup_form-add');
const profileFormEl = document.querySelector('#popup_form-edit');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  errorId: '-error'
};

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

const popupProfile = new PopupWithForm('#popup_profile', {
  formSubmitCallback: formData => {
    userInfo.setUserInfo(formData);
    popupProfile.close();
  }
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup_image', {
  formSubmitCallback: formData => {
    const card = new Card(
      {
        data: formData,
        handleCardClick: () => {
          popupBigImage.open(formData);
        }
      },
      '#card-template'
    );
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

const popupBigImage = new PopupWithImage('#popup_image-big');
popupBigImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: initialCard => {
      const card = new Card(
        {
          data: initialCard,
          handleCardClick: () => {
            popupBigImage.open(initialCard);
          }
        },
        '#card-template'
      );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    }
  },
  cardsContainerEl
);

cardList.renderItems();

editButton.addEventListener('click', () => {
  popupProfile.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;

  profileFormValidate.resetError();
  profileFormValidate.deactivateSubmitButton();
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormEl.reset();
  cardFormValidate.resetError();
  cardFormValidate.activateSubmitButton();
});

const profileFormValidate = new FormValidator(settings, profileFormEl);
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(settings, cardFormEl);
cardFormValidate.enableValidation();
