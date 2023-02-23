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
const cardTemplate = document.querySelector('.template').content;
const cardContainer = document.querySelector('.elements__list');

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
}

//создание
function createCard(name, link, alt) {
  const element = cardTemplate.querySelector('.element').cloneNode(true);
  const picture = element.querySelector('.element__image');
  const title = element.querySelector('.element__title');
  const deleteBtn = element.querySelector('.element__trash');
  const likeBtn = element.querySelector('.element__like-btn');

  title.textContent = name;
  picture.src = link;
  picture.alt = alt;

  picture.addEventListener('click', function (e) {
    openPopup(popupTypeImage);
    popupImage.src = link;
    titleImage.textContent = name;
    popupImage.alt = alt;
  });

  deleteBtn.addEventListener('click', function (e) {
    e.target.closest('.element').remove();
  });

  likeBtn.addEventListener('click', function (e) {
    e.target.classList.toggle('element__like-btn_active');
  });

  return element;
}

//добавление карточки на страницу
function renderItems(name, link, alt) {
  cardContainer.prepend(createCard(name, link, alt));
}

//карточки из массива
initialCards.forEach((e) => renderItems(e.name, e.link, e.name));

function addItems(e) {
  e.preventDefault();
  renderItems(imgName.value, imgLink.value, imgName.value);
  closePopup(popupAddCard);
  formCard.reset();
}

editButton.addEventListener('click', function () {
  openPopup(popupProfile);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  resetValidation(formProfile, enableValidation);
});

addButton.addEventListener('click', function () {
  resetValidation(formCard, enableValidation);
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
