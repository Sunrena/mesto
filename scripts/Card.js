import { popupImage, popupTypeImage, titleImage, openPopup } from "./index.js";
export default class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._title = this._element.querySelector('.element__title');
        this._title.textContent = this._name;
        this._picture = this._element.querySelector('.element__image');
        this._picture.alt = this._name;
        this._picture.src = this._link;

        this._setEventListener();

        return this._element;
    }

    _likeBtn() {
        this._element
            .querySelector('.element__like-btn')
            .classList.toggle('element__like-btn_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _openPopupPic() {
        openPopup(popupTypeImage);
        popupImage.src = this._link;
        popupImage.alt = this._name;
        titleImage.textContent = this._name;
    }

    _setEventListener() {
        this._element
            .querySelector('.element__trash')
            .addEventListener('click', () => {
                this._deleteCard();
            })

        this._element
            .querySelector('.element__like-btn')
            .addEventListener('click', () => {
                this._likeBtn();
            })

        this._picture.addEventListener('click', () => {
            this._openPopupPic();
        })
    }

}