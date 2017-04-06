// Control implemented as ES6 class

export default class EasyButton {

    constructor(div_id, icon, title) {
        this.div_id = div_id;
        this.icon = icon;
        this.title = title;
    }

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('button');
        this._container.className = "mapboxgl-ctrl custom-control-style";
        this._container.id = this.div_id;
        this._container.title = this.title;
        this._span = document.createElement('span');
        this._span.className = 'easy-btn fa fa-lg ' + this.icon;
        this._container.appendChild(this._span);

        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
