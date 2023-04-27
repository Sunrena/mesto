import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { objectValidation } from "./objectValidation.js";

//Карточки из массива
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

//поля формы редактирования
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_subname');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

//кнопки форм: закрыть, сохранить, добавить
const editButton = document.querySelector('.profile__edit-btn');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const addButton = document.querySelector('.profile__add-btn');

//формы
const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

//попап профиля и карточки
const popupProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');

//попап изображения
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const titleImage = popupTypeImage.querySelector('.popup__image-title');

//для создания карточки
const popups = document.querySelectorAll('.popup');
const imgName = document.querySelector('.popup__item_value_place');
const imgLink = document.querySelector('.popup__item_value_url');
//const cardTemplate = document.querySelector('.template').content;
const cardContainer = document.querySelector('.elements__list');

//валидация форм
const validationProfile = new FormValidator(objectValidation, formProfile);
validationProfile.enableValidate();

const validationCard = new FormValidator(objectValidation, formCard);
validationCard.enableValidate();
validationCard.resetValidation();

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeKeydown);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeKeydown);
}

//редактирование профиля
function editProfile(e) {
  e.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupProfile);
  validationProfile.resetValidation();
}

//создание
function createCard(name, link, newTemplate) {
  const card = new Card(name, link, newTemplate);
  const cardElement = card.generateCard();
  return cardElement;
}

//добавление карточки на страницу
function renderItems(item) {
  cardContainer.prepend(item);
}

//карточки из массива
initialCards.forEach((item) => {
  renderItems(createCard(item.name, item.link, '.template'))
});

function addItems(e) {
  e.preventDefault();
  renderItems(createCard(imgName.value, imgLink.value, '.template'));
  closePopup(popupAddCard);
  formCard.reset();
}

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  validationProfile.resetValidation();
});

addButton.addEventListener('click', function () {
  validationCard.resetValidation();
  openPopup(popupAddCard);
  formCard.reset();
});

closeButtons.forEach((e) =>
  e.addEventListener('click', function (e) {
    closePopup(e.target.closest('.popup'));
  })
);

function closeKeydown(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

popups.forEach((e) =>
  e.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  })
);


formProfile.addEventListener('submit', editProfile);
formCard.addEventListener('submit', addItems);

export {titleImage, popupImage, popupTypeImage, openPopup}
