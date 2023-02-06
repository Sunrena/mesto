// Массив карточек при открытии страницы
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

let popup = document.querySelector('.popup');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let jobInput = formElement.querySelector('.form__item_type_subname');

let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

//кнопки форм: закрыть, сохранить, добавить
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');
const addButton = document.querySelector('.profile__add-btn');

//получение формы
const formProfile = document.querySelector('.form_type_profile');
const formCard = document.querySelector('.form_type_card');

// попап профиля
const popupProfile = document.querySelector('.popup__edit-profile');
// попап карточки
const popupAddCard = document.querySelector('.popup__add-card');

// попап картинки
const popupImage = document.querySelector('.popup_type_image');
const picturePopupImage = popupImage.querySelector('.popup__image');
const titlePopupImage = popupImage.querySelector('.popup__image-title');
// данные с формы создания карточки
const inputImgName = document.querySelector('.form__item_value_place');
const inputImgLink = document.querySelector('.form__item_value_url');
const cardTemplate = document.querySelector('.template').content;
const cardsContainer = document.querySelector('.elements__list');
const popups = document.querySelectorAll('.popup');



function openPopup() {
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

//редактирование профиля
function handleFormSubmit (e) {
    e.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closePopup();
}

//создание карточки
function createCard(name, link, alt) {
    const element = cardTemplate.querySelector('.element').cloneNode(true);
    const buttonDelete = element.querySelector('.element__trash');
    const picture = element.querySelector('.element__image');
    const title = element.querySelector('.element__title');
    const buttonLike = element.querySelector('.element__like-btn');
    
    title.textContent = name;
    picture.src = link;
    picture.alt = alt;
    buttonDelete.addEventListener('click', function (e) {
      e.target.closest('.element').remove();
    });
    picture.addEventListener('click', function (e) {
      openPopup(popupImage);
      picturePopupImage.src = link;
      titlePopupImage.textContent = name;
      picturePopupImage.alt = alt;
    });
    buttonLike.addEventListener('click', function (e) {
      e.target.classList.toggle('element__like-btn_active');
    });
  
    return element;
}

//добавление карточки на страницу
function renderItem(name, link, alt) {
    cardsContainer.prepend(createCard(name, link, alt));
}

//загрузка карточек из массива на страницу
initialCards.forEach((e) => renderItem(e.name, e.link, e.name));

function addItem(e) {
    e.preventDefault();
    renderItem(inputImgName.value, inputImgLink.value, inputImgName.value);
    closePopup(popupAddCard);
    formCard.reset();
}

editButton.addEventListener('click', function () {
    openPopup(popupProfile);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
});

addButton.addEventListener('click', function () {
    formCard.reset();
    openPopup(popupAddCard);
});

closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', addItem);
