export default class Card {
    constructor({ data, templateSelector, handleCardClick, currentId, handleLike, handleDeleteLike, handleDeleteCard}) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLike = handleLike;
        this._handleDeleteLike = handleDeleteLike;
        this._handleDeleteCard = handleDeleteCard;
        this._card = data;
        this._cardUserId = data.owner._id;
        this.idCard = data._id;
        this._dataLikes = data.likes;
        this._currentId = currentId();
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
        this._likeCounter = this._element.querySelector('.element__like-counter');
        this.showLike(this._card.likes.length);
        this.switchLike();

        this._setEventListener();

        if (this._currentId === this._cardUserId) {
            this._trashButton.classList.add('element__trash_active');
        }
        return this._element;
    }

    likeBtn() {
        this._likeButton.classList.add('element__like-btn_active');
    }

    deleteLike() {
        this._likeButton.classList.remove('element__like-btn_active');
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    showLike(likes) {
            this._likeCounter.textContent = likes;
    }

    switchLike() {
        return Array.from(this._card.likes).forEach((likeInfo) => {
            if (likeInfo._id === this._currentId) {
                this.likeBtn();
            } else {
                this.deleteLike();
            }
        })
    }


    _setEventListener() {
        this._trashButton.addEventListener('click', () => {
                this._handleDeleteCard(this);
            })

        this._likeButton.addEventListener('click', () => {
            if (!this._likeButton.classList.contains('element__like-btn_active'))
            {this._handleLike(this)} else {
                this._handleDeleteLike(this.idCard, this._card)
            }
            });

        this._picture.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

}