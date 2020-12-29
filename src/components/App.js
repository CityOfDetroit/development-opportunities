import Maps from './Map';
import Panel from './Panel';
import Geocoder from './Geocoder';
import './App.scss';

export default class App {
    constructor() {
        this.mapillaryClientID = 'bmZxVGc0ODVBVXhZVk5FTDdyeHlhZzowM2EyODU0Njc4OWY3ZGNi';
        this.imageKeys = null
        this.currentImageKey = null;
        this.parcel = null;
        this.propertyData = null;
        this.point = null;
        this.map = new Maps('map', this);
        this.filters = [];
        this.boundary = null;
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
        let infoBtn = document.createElement('button');
        dashBtn.innerHTML = '<i class="fas fa-tachometer-alt"></i> <span>Dashboard</span>';
        dashBtn.addEventListener('click', (ev)=>{
            ev.preventDefault();
            _app.panel.createPanel(_app.panel, 'dash');
        });
        configBtn.innerHTML = '<i class="fas fa-cogs"></i> <span>Settings</span>';
        configBtn.addEventListener('click', (ev)=>{
            ev.preventDefault();
            _app.panel.createPanel(_app.panel, 'filter');
        });
        infoBtn.innerHTML = '<i class="fas fa-info-circle"></i> <span>Info</span>';
        infoBtn.addEventListener('click', (ev)=>{
            ev.preventDefault();
            _app.panel.createPanel(_app.panel, 'info');
        });
        _app.userControls.appendChild(dashBtn);
        _app.userControls.appendChild(configBtn);
        _app.userControls.appendChild(infoBtn);
        document.getElementById('user-controls').appendChild(_app.userControls);
    }

    getParcelData(_app){
        fetch(`https://apis.detroitmi.gov/assessments/parcel/${_app.parcel}`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
          console.log(data);
          _app.propertyData = data;
          _app.panel.dashLast = 'parcel';
          _app.panel.createPanel(_app.panel, 'dash');
        }).catch( err => {
          // console.log(err);
        });
    }

    getImageKey(_app, lng, lat){
        fetch(`https://a.mapillary.com/v3/images?client_id=${_app.mapillaryClientID}&closeto=${lng},${lat}&radius=80&usernames=codgis&start_time=2018-07-01`)
        .then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            console.log(data);
            let sequences = [];
            data.features.forEach((ik) => {
                if (sequences.map((s) => s.properties.captured_at.slice(0, 10)).indexOf(ik.properties.captured_at.slice(0, 10)) === -1) {
                    sequences.push(ik);
                }
            });
            console.log(sequences);

            let sorted = sequences.sort((a, b) => new Date(a.properties.captured_at) - new Date(b.properties.captured_at));
            console.log(sorted);
            _app.imageKeys = sorted;
            _app.currentImageKey = sorted[sorted.length - 1];
            _app.panel.createImagery(_app.panel);
        }).catch( err => {
          // console.log(err);
        });
    }

    checkParcelValid(parcel){
        return /\d/.test(parcel);
    }
}