import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
    constructor({ popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    open(newCard, id) {
        super.open();
        this._id = id;
        this._newCard = newCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._buttonSave.addEventListener('click', () => {
            this._handleFormSubmit(this._card, this._id);
        });
        
        
    }
}