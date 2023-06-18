import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { objectValidation } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

//поля формы редактирования
const nameInput = document.querySelector('.popup__item_type_name');
const jobInput = document.querySelector('.popup__item_type_subname');

//кнопки форм: закрыть, сохранить, добавить
const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');

//формы
const formProfile = document.querySelector('.popup__form_type_profile');
const formCard = document.querySelector('.popup__form_type_card');
const formAvatar = document.querySelector('.popup__form_type_avatar');

//изменение аватара
const buttonEditAvatar = document.querySelector('.profile__avatar-btn');
const profileAvatar = document.querySelector('.profile__avatar');

//валидация форм
const validationProfile = new FormValidator(objectValidation, formProfile);
validationProfile.enableValidate();

const validationCard = new FormValidator(objectValidation, formCard);
validationCard.enableValidate();

const validationAvatar = new FormValidator(objectValidation, formAvatar);
validationAvatar.enableValidate();


const api = new Api({
  headers: {
    authorization: "6030fb95-8b1e-43bf-a548-3fe76a35651e",
    "Content-Type": "application/json",
  },
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-68/",
});

const userInfo = new UserInfo({
  nameProfileSelector: '.profile__title',
  jobProfileSelector: '.profile__subtitle',
  avatarProfileSelector: '.profile__avatar',
});

const popupTypeImage = new PopupWithImage('.popup_type_image');

//создание
function createCard(data) {
  const card = new Card({
    data: data,
    currentId: userInfo.getCurrentUserId,
    templateSelector: '.template',
    handleCardClick: (name, link) => {
      popupTypeImage.open(name, link);
    },

    handleDeleteCard: () => {
      popupDeleteCard.open(card, data._id);
    },

    handleDeleteLike: () => {
      api.switchLikeCard(card.idCard, card.isLiked(card.dataLikes))
        .then((res) => {
          card.switchLike(res);
          card.deleteLike();
        })
        .catch((err) => console.log(err));
    },

    handleLike: () => {
      api.switchLikeCard(card.idCard, card.isLiked(card.dataLikes))
      .then(res => {
        card.switchLike(res);
      })
      .catch((err) => console.log(err));
    }
  });

  return card.generateCard();
}

//Экземпляр класса Section (отображение карточек)
const cardContainer = new Section({
  renderer: (data) => {
    cardContainer.addItem(createCard(data));
  },
  selector: '.elements__list',
})

//экземпляры класса PopupWithForm
const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_add-card',
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true, 'Сохранение карточки...');
    api.createCard(data)
      .then((newCard) => {
        cardContainer.addItem(createCard(newCard));
        popupAddCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddCard.renderLoading(false);
      });
  }
}
);

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: (item) => {
    popupProfile.renderLoading(true, 'Сохранение профиля...');
    api.setUserInfo(item)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
});

const popupAddAvatar = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: (item) => {
    popupAddAvatar.renderLoading(true, 'Сохранение аватара...');
    api.setAvatar(item)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupAddAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupAddAvatar.renderLoading(false);
      });
  }
});

//Удаление карточки (попап)
const popupDeleteCard = new PopupWithConfirm({
  popupSelector: '.popup_delete-card',
  handleFormSubmit: (card, cardId) => {
    popupDeleteCard.renderLoading(true, 'Удаление карточки...');
    api.deleteCard(cardId)
      .then(() => {
        card.deleteCard();
        popupDeleteCard.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupDeleteCard.renderLoading(false);
      });
  }
})

function editProfile() {
  popupProfile.open();
  const user = userInfo.getUserInfo();
  nameInput.value = user['name'];
  jobInput.value = user['about'];
  validationProfile.resetValidation();
}

function addCard() {
  validationCard.resetValidation();
  popupAddCard.open();
}

function editAvatar() {
  validationAvatar.resetValidation();
  popupAddAvatar.open();
}

editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', addCard);

buttonEditAvatar.addEventListener('click', editAvatar);

Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
  .then(([promUser, promCards]) => {
    userInfo.setUserInfo(promUser);
    userInfo.setCurrentUserId(promUser._id);
    profileAvatar.src = promUser.avatar;

    cardContainer.renderItems(promCards);
  })
  .catch((err) => console.log(err));

popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupTypeImage.setEventListeners();
popupAddAvatar.setEventListeners();
popupDeleteCard.setEventListeners();

