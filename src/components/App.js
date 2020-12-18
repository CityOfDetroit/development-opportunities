import Map from './Map';
import Panel from './Panel';
import Geocoder from './Geocoder';
import './App.scss';

export default class App {
    constructor() {
        this.parcel = null;
        this.propertyData = null;
        this.point = null;
        this.map = new Map('map', this);
        this.layers = [];
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
          _app.panel.createPanel(_app.panel, 'property');
        }).catch( err => {
          // console.log(err);
        });
    }

    checkParcelValid(parcel){
        return /\d/.test(parcel);
    }
}