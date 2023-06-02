export default class Section {
    constructor({data, renderer }, selector) {
        this._renderer = renderer;
        this._initialArray = data;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._initialArray.array.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}