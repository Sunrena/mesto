import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._titleImage = this._popup.querySelector('.popup__image-title');
    }

    open(name, link) {
        this._popupImage.alt = name;
        this._popupImage.src = link;
        this._titleImage.textContent = name;

        super.open();
    }
}