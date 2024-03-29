export default class Section {
    constructor({ renderer , selector }) {
        this._renderer = renderer;
        //this._initialArray = data;
        this._container = document.querySelector(selector);
    }

    renderItems(data) {
        data.reverse().forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }

}