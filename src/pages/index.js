import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { objectValidation, initialCards } from "../utils/constants.js";
import Section from "./components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//поля формы редактирования
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_subname');

//кнопки форм: закрыть, сохранить, добавить
const editButton = document.querySelector('.profile__edit-btn');
//const closeButtons = document.querySelectorAll('.popup__close-btn');
const addButton = document.querySelector('.profile__add-btn');

//формы
const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');

//валидация форм
const validationProfile = new FormValidator(objectValidation, formProfile);
validationProfile.enableValidate();

const validationCard = new FormValidator(objectValidation, formCard);
validationCard.enableValidate();

const userInfo = new UserInfo({
  nameProfile: '.profile__title',
  jobProfile: '.profile__subtitle',
});

const popupTypeImage = new PopupWithImage('.popup_type_image');

//создание
function createCard(objectValidation) {
  const card = new Card(objectValidation);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardContainer = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = createCard({
      name: item.name,
      link: item.link,
      templateSelector: '.template',
      handleCardClick: (name, link) => {
        popupTypeImage.open(name, link);
      }
    });
    cardContainer.addItem(card);
  }
},
'.elements__list'
)

cardContainer.renderItems();

//экземпляры класса PopupWithForm
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  handleFormSubmit: ({ place, link}) => {
    const card = createCard({
      name: place,
      link: link,
      templateSelector: '.template',
      handleCardClick: (name, link) => {
        popupTypeImage.open(name, link);
      }
    });
    cardContainer.addItem(card);
  }
});

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: ({ name, about}) => {
    userInfo.setUserInfo({ name, about});
  }
})

//редактирование профиля
function editProfile() {
  popupProfile.open();
  nameInput.value = userInfo.getUserInfo()['name'];
  jobInput.value = userInfo.getUserInfo()['about'];
  validationProfile.resetValidation();
}

function addCard() {
  validationCard.resetValidation();
  popupAddCard.open();
}


editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', addCard);

popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupTypeImage.setEventListeners();


