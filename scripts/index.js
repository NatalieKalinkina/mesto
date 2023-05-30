// Добавление карточек

const template = document.querySelector('#card-template');
const templateContent = template.content;
const cardEl = templateContent.querySelector('.card');
const elementsEl = document.querySelector('.elements');
const newCard = cardEl.cloneNode(true);
const cardFormEl = document.querySelector('#popup_form-add');
const popupAddEl = document.querySelector('#popup_image');

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

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  elementsEl.prepend(newCard);
});

function createCard(item) {
  const newCard = cardEl.cloneNode(true);

  const titleEl = newCard.querySelector('.card__title');
  titleEl.textContent = item.name;

  const imageEl = newCard.querySelector('.card__image');
  const bigImageEl = document.querySelector('.bigImagePopup__image');
  const bigCaptionEl = document.querySelector('.bigImagePopup__caption');
  imageEl.alt = item.name;
  imageEl.src = item.link;

  imageEl.addEventListener('click', function () {
    const popupEl = document.querySelector('#popup_image-big');
    bigImageEl.src = imageEl.src;
    bigCaptionEl.textContent = titleEl.textContent;
    bigImageEl.alt = titleEl.textContent;
    openPopup(popupEl);
  });

  const likeButton = newCard.querySelector('.card__like-button');
  likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('card__like-button_active');
  });

  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    elementsEl.removeChild(newCard);
  });

  return newCard;
}

cardFormEl.addEventListener('submit', function (event) {
  event.preventDefault();
  const imageNameInput = document.querySelector('.popup__text_type_image-name');
  const imageSrcInput = document.querySelector('.popup__text_type_image-src');
  const item = templateContent.cloneNode(true);
  item.name = imageNameInput.value;
  item.link = imageSrcInput.value;
  const newCard = createCard(item);
  elementsEl.prepend(newCard);
  closePopup(popupAddEl);
  imageNameInput.value = '';
  imageSrcInput.value = '';
});

// Редактирование данных профиля

const profileFormEl = document.querySelector('#popup_form-edit');
const popupEditEl = document.querySelector('#popup_profile');

function profileFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditEl);
}

profileFormEl.addEventListener('submit', profileFormSubmit);

// Открытие попапов

const popupEl = document.querySelectorAll('.popup');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const imageNameInput = document.querySelector('.popup__text_type_image-name');
const imageSrcInput = document.querySelector('.popup__text_type_image-src');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

function openPopup(popupEl) {
  popupEl.classList.add('popup_opened');
}

editButton.addEventListener('click', function () {
  const popupEl = document.querySelector('#popup_profile');
  openPopup(popupEl);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
});

addButton.addEventListener('click', function () {
  const popupEl = document.querySelector('#popup_image');
  openPopup(popupEl);
});

// Закрытие попапов

const closeProfile = document.querySelector('#profile-edit_close-button');
const closeCardAdd = document.querySelector('#card-add_close-button');
const closeBigImage = document.querySelector('#big-image_close-button');

function closePopup(popupEl) {
  popupEl.classList.remove('popup_opened');
}

closeProfile.addEventListener('click', function () {
  const popupEl = document.querySelector('#popup_profile');
  closePopup(popupEl);
});

closeCardAdd.addEventListener('click', function () {
  const popupEl = document.querySelector('#popup_image');
  closePopup(popupEl);
});

closeBigImage.addEventListener('click', function () {
  const popupEl = document.querySelector('#popup_image-big');
  closePopup(popupEl);
});
