//Карточки из массива
const initialCards = [
    {
      name: 'Ещё котик',
      link: 'https://downloader.disk.yandex.ru/preview/86adbfaf61803aa551f7ce1afc04068ed6348a71b9038c31b35452b1afcdcb72/63e2f431/-kzLil_M5jDkyzf2kJP-lkl5leYfuGGpF8Pumood3-4qSJYjrTYIvOiusMoFAM0U4307AaFweG3hOQNdCimjaw%3D%3D?uid=0&filename=1447765801_80236817.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    },
    {
      name: 'Котик',
      link: 'https://downloader.disk.yandex.ru/preview/dadec16e5f45a6aac490b5bf0aa31e7d44ab469d98fcbf3eef042b5677794153/63e2f46f/P7gZNM-TLpuFygzPAfC3TL9_dKCtANwFNJHHMVUUc_Kw0q0EeHGcUay875bJiq5IGwpJT2r-NHiIpC4uK4tA8w%3D%3D?uid=0&filename=1611846316_9-p-foni-s-kosmosom-i-kotami-9.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    },
    {
      name: 'Грут',
      link: 'https://downloader.disk.yandex.ru/preview/4353af272e33bbed1b910323f9514baaa3af742e02dda36f4d8f96a78a3094c1/63e2f4ab/LYgTzNFq235t-AQ9UOE2OBdKqdviy6FVhuoL6_PWBHc-MX_aWDiqDjWYvdb6nMdSzNsGQogXnjUTDVl2u4N9Rg%3D%3D?uid=0&filename=grut-1024x576.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    },
    {
      name: 'Завтра пятница?',
      link: 'https://downloader.disk.yandex.ru/preview/c42d69b6a3eb6b3c9c45a8dd13537f0bf28d912442f7e092f5dc9351ad3ab4bf/63e2f6f5/pkhxThI0g0rTzXsM3Qrtj3l2Ri5YFAnrQ3yGsMid0fLvyjZO5WCRZ0iDH_PMZ3GYuHYFI9vs04wQpB8m3jeHiA%3D%3D?uid=0&filename=photo_2023-01-10_10-52-16.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    },
    {
      name: 'Делаем проект',
      link: 'https://downloader.disk.yandex.ru/preview/b02e0069986f94c9ad0e225894237d01e22819d1b35665e5bfe5513d7c41a2d8/63e2f720/QNMq-3Lwg7NJZhJPA5qbYbTAzuAim94d2pP0QGYvPC6WNowTSqajLDtw3Jf0JhoisKX3JmfLUWqT7t-zTwkI-g%3D%3D?uid=0&filename=photo_2023-01-30_19-27-19.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    },
    {
      name: 'Просто хобби',
      link: 'https://downloader.disk.yandex.ru/preview/0db8e8e915c4ece86925c04fe9c91613ac617dbaa0d336760d808702b905cd35/63e2f743/Zb4ANHzKYM3Y3NHeKX9vla0_r3O2zrxUnWjp3Sur4M3G8IZTNngjT9C5WBHUobBVJ0nrT69ShWiWi3DgZvL4bg%3D%3D?uid=0&filename=photo_2023-01-02_14-51-57.jpg&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048'
    }
];

//поля формы редактирования
let nameInput = document.querySelector('.popup__item_type_name');
let jobInput = document.querySelector('.popup__item_type_subname');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

//кнопки форм: закрыть, сохранить, добавить
const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelectorAll('.popup__close-btn');
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
const popup = document.querySelectorAll('.popup');
const imgName = document.querySelector('.popup__item_value_place');
const imgLink = document.querySelector('.popup__item_value_url');
const cardTemplate = document.querySelector('.template').content;
const cardContainer = document.querySelector('.elements__list');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

//редактирование профиля
function handleFormSubmit (e) {
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
});

addButton.addEventListener('click', function () {
    formCard.reset();
    openPopup(popupAddCard);
});

closeButton.forEach((e) => 
e.addEventListener('click', function (e) {
   closePopup(e.target.closest('.popup'));
})
);

formProfile.addEventListener('submit', handleFormSubmit);
formCard.addEventListener('submit', addItems);
