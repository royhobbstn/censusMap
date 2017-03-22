    // Control implemented as ES6 class
export default class DropdownCtrl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this._select = document.createElement('select');
        this._select.id = 'acs_stat';

        this._option1 = document.createElement('option');
        this._option1.text = 'Median Household Income';
        this._option1.value = 'mhi';
        this._option2 = document.createElement('option');
        this._option2.text = 'Median Home Value';
        this._option2.value = 'mhv';
        this._select.appendChild(this._option1);
        this._select.appendChild(this._option2);
        this._container.appendChild(this._select);
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}