export default class Card {
    constructor({ data, templateSelector, handleCardClick, currentId, handleLike, handleDeleteLike, handleDeleteCard }) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._card = data;
        this._cardUserId = data.owner._id;
        this.idCard = data._id;
        this.dataLikes = data.likes;
        this._currentId = currentId();
        this._handleLike = handleLike;
        this._handleDeleteLike = handleDeleteLike;
        this._likesCounter = data.likes.length;
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
        this._likeCounter.textContent = this._likesCounter;

        if (this._currentId === this._cardUserId) {
            this._trashButton.classList.add('element__trash_active');
        }
        

        if (this.isLiked(this.dataLikes)) {
            this._likeButton.classList.add('element__like-btn_active');
        }

        this._setEventListener();

        return this._element;
    }

    isLiked(likes) {
        return likes.some((like) => {
            return like._id === this._currentId;
        });
    }

    deleteLike() {
        this._likeButton.classList.remove('element__like-btn_active');
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    switchLike({ likes }) {
        this._likeButton.classList.toggle('element__like-btn_active');
        this._likeCounter.textContent = likes.length;
    }


    _setEventListener() {
        this._trashButton.addEventListener('click', () => {
                this._handleDeleteCard(this);
            });


        this._likeButton.addEventListener('click', () => {
            this._handleLike(this);
        }); 

        this._picture.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }
}