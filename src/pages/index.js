import './index.css';

import {initialCards, cardsContainerEl, cardFormEl, profileFormEl, nameInput, jobInput, editButton, addButton, settings} from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { UserInfo } from '../scripts/components/UserInfo.js';

const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job' });

const createCard = (data) => {
  const card = new Card (
    {
      data: data,
      handleCardClick: () => {
        popupBigImage.open(data);
    }
  },
  '#card-template'
  );
  return card;
}

const popupProfile = new PopupWithForm('#popup_profile', {
  formSubmitCallback: formData => {
    userInfo.setUserInfo(formData);
    popupProfile.close();
  }
});
popupProfile.setEventListeners();

const popupAddCard = new PopupWithForm('#popup_image', {
  formSubmitCallback: formData => {
    const card = createCard(formData);
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
      const card = createCard(initialCard);
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
