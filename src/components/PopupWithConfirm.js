import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    open(card, cardId) {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }

    renderLoading(isLoading, text) {
        if (isLoading) {
            this._text = this._buttonSave.textContent;
            this._buttonSave.textContent = text;
        } else {
            this._buttonSave.textContent = this._text;
        }

        if (!this._buttonSave)
        return;
    }
    
    setEventListeners() {
        super.setEventListeners();
        this._buttonSave.addEventListener('click', () => {
            this._handleFormSubmit(this._card, this._cardId);
        });
        
        
    }
}