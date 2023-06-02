import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__item'));

    }

    _getInputValues() {
        this._formValue = {};
        this._inputList.forEach((input) => {
            this._formValue[input.name] = input.value;
        });

        return this._formValue;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

            this.close();
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}