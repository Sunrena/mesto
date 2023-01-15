let popup = document.querySelector('.popup');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_type_name');
let jobInput = formElement.querySelector('.form__item_type_subname');

let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');


const editButton = document.querySelector('.profile__edit-btn');
const closeButton = document.querySelector('.popup__close-btn');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;

    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
