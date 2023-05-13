let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.input_name');
let jobInput = document.querySelector('.input_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
function handleFormSubmit(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit);

let closeButton = document.querySelector('.popup__close');
function handleFormClose(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameProfile.textContent;
  jobProfile.textContent = jobProfile.textContent;
  popup.classList.remove('popup_opened');
}
closeButton.addEventListener('click', handleFormClose);
