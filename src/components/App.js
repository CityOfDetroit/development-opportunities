import Map from './Map';
import Panel from './Panel';
import Geocoder from './Geocoder';
import './App.scss';

export default class App {
    constructor() {
        this.point = null;
        this.map = new Map('map');
        this.layers = {};
        this.userControls = document.createElement('form');
        this.panel = new Panel(this);
        this.geocoder = new Geocoder('geocoder', this);
        this.initialLoad(this);
    }

    initialLoad(_app){
        document.getElementById('close-welcome').addEventListener('click', ()=>{
            document.getElementById('welcome-panel').className = '';
        });
        let dashBtn = document.createElement('button');
        let configBtn = document.createElement('button');
        dashBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> <span>Dashboard</span>';
        dashBtn.addEventListener('click', (ev)=>{
            ev.preventDefault();
            _app.panel.createPanel(_app.panel, 'dash');
        });
        configBtn.innerHTML = '<i class="fas fa-cogs"></i> <span>Filters</span>';
        configBtn.addEventListener('click', (ev)=>{
            ev.preventDefault();
            _app.panel.createPanel(_app.panel, 'config');
        });
        _app.userControls.appendChild(dashBtn);
        _app.userControls.appendChild(configBtn);
        document.getElementById('user-controls').appendChild(_app.userControls);
    }



    queryLayer(_app, latlng){
        let needAdress = false;
        let myIcon = L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 35],
            iconAnchor: [25, 35],
            popupAnchor: [-3, -76],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            shadowSize: [68, 95],
            shadowAnchor: [22, 94]
        });
        let tempLocation = null;
        if(latlng.geometry){
            tempLocation = {lat: latlng.geometry.coordinates[1],lng:  latlng.geometry.coordinates[0]};            
        }else{
            needAdress = true;
            tempLocation = latlng;
        }
        let userPoint = L.layerGroup().addTo(_app.map);
        if(_app.point){
            _app.point.clearLayers();
            _app.point = userPoint.addLayer(L.marker(tempLocation,{icon: myIcon}));
        }else{ 
            _app.point = userPoint.addLayer(L.marker(tempLocation,{icon: myIcon}));
        }
        _app.map.flyTo(tempLocation, 15);
        if(_app.panel.data.type == null){
            esri.query({ url:'https://gis.detroitmi.gov/arcgis/rest/services/OpenData/CertificateOfCompliance/FeatureServer/0'}).where(`parcel_id = '${_app.panel.data.parcel}'`).run(function (error, featureCollection) {
                if (error) {
                  console.log(error);
                  return;
                }
                if(featureCollection.features.length){
                    _app.panel.data.date = moment(featureCollection.features[0].properties.record_status_date).format('MMM Do, YYYY');
                    _app.panel.data.type = featureCollection.features[0].properties.task;
                    _app.panel.createPanel(_app.panel);
                }else{
                    esri.query({ url:'https://gis.detroitmi.gov/arcgis/rest/services/OpenData/RentalStatuses/FeatureServer/0'}).where(`parcel_id = '${_app.panel.data.parcel}'`).run(function (error, featureCollection) {
                        if (error) {
                        console.log(error);
                        return;
                        }

                        if(featureCollection.features.length){
                            _app.panel.data.date = moment(featureCollection.features[0].properties.record_status_date).format('MMM Do, YYYY');
                            _app.panel.data.type = featureCollection.features[0].properties.task;
                        }else{
                            _app.panel.data.type = null;
                        }
                        _app.panel.createPanel(_app.panel);
                    });
                }
            });
        }
    }

    checkParcelValid(parcel){
        return /\d/.test(parcel);
    }
}