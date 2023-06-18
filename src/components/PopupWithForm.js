import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__item'));

    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });

        return formValues;
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
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());

        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}