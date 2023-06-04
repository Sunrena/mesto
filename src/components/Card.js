export default class Card {
    constructor({ name, link, templateSelector, handleCardClick }) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
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
        this._likeButton = this._element.querySelector('.element__like-btn');
        this._trashButton = this._element.querySelector('.element__trash');

        this._setEventListener();

        return this._element;
    }

    _likeBtn() {
        this._likeButton.classList.toggle('element__like-btn_active');
    }

    _deleteCard() {
        this._element.remove();
    }

    _setEventListener() {
        this._trashButton.addEventListener('click', () => {
                this._deleteCard();
            })

        this._likeButton.addEventListener('click', () => {
                this._likeBtn();
            })

        this._picture.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

}