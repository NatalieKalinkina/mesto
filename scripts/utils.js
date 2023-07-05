const popupList = document.querySelectorAll('.popup');

function openPopup(popupList) {
  popupList.classList.add('popup_opened');
  document.body.addEventListener('keydown', closeByEsc);
  popupList.addEventListener('click', closeByOverlay);
}

function closePopup(popupList) {
  document.body.removeEventListener('keydown', closeByEsc);
  popupList.removeEventListener('click', closeByOverlay);
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

export { popupList, openPopup, closePopup, closeByEsc, closeByOverlay };
