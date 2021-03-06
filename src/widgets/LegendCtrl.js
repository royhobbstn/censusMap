    // Control implemented as ES6 class
export default class LegendCtrl {

    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.id = 'legend-ctrl';
        this._container.className = 'mapboxgl-ctrl custom-control-style';
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
    
    remove() {
        this.onRemove(); // alias the onRemove function (which presumably is also used in internal functions by Mapbox GL JS)
    }
    
}