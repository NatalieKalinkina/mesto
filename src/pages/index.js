import './index.css';

import {
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
} from '../scripts/constants.js';
import { Card } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import { Section } from '../scripts/components/Section.js';
import { PopupWithImage } from '../scripts/components/PopupWithImage.js';
import { PopupWithForm } from '../scripts/components/PopupWithForm.js';
import { PopupConfirmation } from '../scripts/components/PopupConfirmation.js';
import { UserInfo } from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js';
import { data } from 'autoprefixer';

const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__about',
  avatar: '.profile__avatar'
});

let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userId = userData._id;
    cardList.renderItems(initialCards);
  })
  .catch(err => console.error(err));

const createCard = data => {
  const card = new Card(
    {
      data: data,
      handleCardClick: () => {
        popupBigImage.open(data);
      },
      cardRemoving: () => {
        popupDeleteConfirmation.open(card, data._id);
      },
      handleLikeClick: () => {
        api
          .addLike(data._id)
          .then(data => {
            card.updateLikeCounter(data.likes.length);
            card.likeCard();
          })
          .catch(err => console.error(err));
      },
      handleDislikeClick: () => {
        api
          .deleteLike(data._id)
          .then(data => {
            card.updateLikeCounter(data.likes.length);
            card.dislikeCard();
          })
          .catch(err => console.error(err));
      }
    },
    userId,
    '#card-template'
  );
  return card.createCard();
};

const popupDeleteConfirmation = new PopupConfirmation('#popup_confirmation', {
  callback: (card, cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        popupDeleteConfirmation.close();
        card.deleteCard();
      })
      .catch(err => console.error(err));
  }
});

popupDeleteConfirmation.setEventListeners();

const popupProfile = new PopupWithForm('#popup_profile', {
  formSubmitCallback: formData => {
    popupProfile.renderLoading(true);
    api
      .postUserInfo(formData)
      .then(data => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch(err => console.error(err))
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
});

popupProfile.setEventListeners();

const popupAvatar = new PopupWithForm('#popup_avatar', {
  formSubmitCallback: formData => {
    popupAvatar.renderLoading(true);
    api
      .postUserAvatar(formData)
      .then(data => {
        userInfo.setUserAvatar(data);
        popupAvatar.close();
      })
      .catch(err => console.error(err))
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
});

popupAvatar.setEventListeners();

const cardList = new Section(
  {
    renderer: item => {
      const card = createCard(item);
      cardList.addItem(card);
    }
  },
  cardsContainerEl
);

const popupAddCard = new PopupWithForm('#popup_image', {
  formSubmitCallback: formData => {
    popupAddCard.renderLoading(true);
    api
      .postNewCard(formData)
      .then(data => {
        const card = createCard(data);
        cardList.addItem(card);
        popupAddCard.close();
      })
      .catch(err => console.error(err))
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
});
popupAddCard.setEventListeners();

const popupBigImage = new PopupWithImage('#popup_image-big');
popupBigImage.setEventListeners();

editButton.addEventListener('click', () => {
  popupProfile.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  aboutInput.value = userData.about;

  profileFormValidate.resetError();
  profileFormValidate.deactivateSubmitButton();
});

avatarEditButton.addEventListener('click', () => {
  popupAvatar.open();
  avatarFormValidate.resetError();
  avatarFormValidate.deactivateSubmitButton();
});

addButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidate.resetError();
  cardFormValidate.activateSubmitButton();
});

const profileFormValidate = new FormValidator(settings, profileFormEl);
profileFormValidate.enableValidation();

const cardFormValidate = new FormValidator(settings, cardFormEl);
cardFormValidate.enableValidation();

const avatarFormValidate = new FormValidator(settings, avatarFormEl);
avatarFormValidate.enableValidation();
