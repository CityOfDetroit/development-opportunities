import mapboxgl from 'mapbox-gl';
import mapStyle from './style.json';
import './Map.scss';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdGZpcmUiLCJhIjoiY2tpdDVnYnpyMG81NDMycnh0ZG5nOXU0cCJ9.XHsQ74nCMMOE6hYdXnSeyg';

export default class Map {
    constructor(container) {
        this.map = new mapboxgl.Map({
            container: container, // container id
            style: mapStyle, // stylesheet location
            center: [-83.1,42.36], // starting position [lng, lat]
            zoom: 12, // starting zoom
        });
        this.init(this);
    }

    init(_map){
        _map.map.addControl(new mapboxgl.NavigationControl());
    }
}