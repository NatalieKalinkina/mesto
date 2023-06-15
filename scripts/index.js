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
const closeProfile = document.querySelector('#profile-edit_close-button');
const closeCardAdd = document.querySelector('#card-add_close-button');
const closeBigImage = document.querySelector('#big-image_close-button');
const profileSubmitButton = document.querySelector('#profile-submit-button');

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  renderCard(newCard);
});

function createCard(item) {
  const newCard = cardEl.cloneNode(true);

  const titleEl = newCard.querySelector('.card__title');
  titleEl.textContent = item.name;

  const imageEl = newCard.querySelector('.card__image');

  imageEl.alt = item.name;
  imageEl.src = item.link;

  imageEl.addEventListener('click', function () {
    bigImageEl.src = imageEl.src;
    bigCaptionEl.textContent = titleEl.textContent;
    bigImageEl.alt = titleEl.textContent;
    openPopup(popupBigImage);
  });

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
  });

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    newCard.remove();
  });

  return newCard;
}

function renderCard(item) {
  cardsContainerEl.prepend(item);
}

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
    closePopup(document.querySelector('.popup_opened'));
  }
}

function profileFormSubmit(evt) {
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
  const newCard = createCard(item);
  renderCard(newCard);
  closePopup(popupAddCard);
});

profileFormEl.addEventListener('submit', profileFormSubmit);

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  hideInputError(profileFormEl, nameInput);
  hideInputError(profileFormEl, jobInput);
  profileSubmitButton.classList.remove('popup__submit-button_inactive');
  profileSubmitButton.removeAttribute('disabled');
});

addButton.addEventListener('click', function () {
  openPopup(popupAddCard);
  cardFormEl.reset();
  hideInputError(cardFormEl, imageSrcInput);
  hideInputError(cardFormEl, imageNameInput);
});

closeProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

closeCardAdd.addEventListener('click', function () {
  closePopup(popupAddCard);
});

closeBigImage.addEventListener('click', function () {
  closePopup(popupBigImage);
});
