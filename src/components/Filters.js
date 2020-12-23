'use strict';
import './Filters.scss';
export default class Filters {
  constructor(container, app) {
    this.form = null;
    this.expansion = {
        transportation : false
    }
    this.app = app;
    this.container = document.getElementById(container);
    this.buidlForm(document.getElementById(container), this);
  }

  checkLock(_filterPanel){
    if(_filterPanel.lock == true){
        return true;
    }else{
        return false;
    }
  }

  changeLock(_filterPanel){
    if(_filterPanel.lock == true){
        _filterPanel.lock = false;
    }else{
        _filterPanel.lock = true;
    }
  }
  
  removeForm(container){
    container.removeChild(container.childNodes[1]);
  }

  updateFilters(ev,_filterPanel){
    console.log(ev);
    let visibility = 'none';
    if(ev.target.checked){
      visibility = 'visible';
      if(!_filterPanel.app.filters.includes(ev.target.id)){
        _filterPanel.app.filters.push(ev.target.id);
      }
    }else{
      if(_filterPanel.app.filters.includes(ev.target.id)){
        let filtered = _filterPanel.app.filters.filter(function(value, index, arr){ 
          return value != ev.target.id;
        });
        console.log(filtered);
        _filterPanel.app.filters = filtered;
      }
    }
    let layers = ev.target.value.split(',');
    _filterPanel.app.map.changeVisibility(layers, visibility, _filterPanel.app.map);
    if(ev.target.className == 'parent-filter'){
      _filterPanel.changeSubsets(ev, _filterPanel);
    }
  }

  changeSubsets(ev, _filterPanel){
    console.log(ev);
  }

  buidlForm(container, _filterPanel){
    _filterPanel.form = document.createElement('form');
    // Create zipcodes section elemets
    let transportation = document.createElement('article');
    let transportationAllInput = document.createElement('input');
    let transportationAllLabel = document.createElement('label');
    let transportationAllExpandBtn = document.createElement('button');
    let transportationSubsets = document.createElement('article');
    let smartBusInput = document.createElement('input');
    let smartBusLegend = document.createElement('span');
    let smartBusLabel = document.createElement('label');
    transportation.className ='parent-filter-container';
    transportationAllInput.type = 'checkbox';
    transportationAllInput.value = 'smartroutes'
    transportationAllInput.id = 'transportation-all';
    transportationAllInput.name = 'trans-data';
    if(_filterPanel.app.filters.includes('transportation-all')){
      transportationAllInput.checked = true;
    }else{
      transportationAllInput.checked = false;
    }
    transportationAllInput.className = 'parent-filter';
    transportationAllLabel.innerText = 'All transportations';
    transportationAllLabel.setAttribute('for', 'transportation-all');
    transportationAllExpandBtn.type = 'expand';
    transportationAllInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    if(_filterPanel.expansion.transportation){
        transportationAllExpandBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }else{
        transportationAllExpandBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
    transportationAllExpandBtn.addEventListener('click', (ev)=>{
        (_filterPanel.expansion.transportation) ? _filterPanel.expansion.transportation = false : _filterPanel.expansion.transportation = true;
        _filterPanel.removeForm(_filterPanel.container);
        _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
    });
    if(_filterPanel.expansion.transportation){
      transportationSubsets.className = 'filter-subset active';
    }else{
      transportationSubsets.className = 'filter-subset';
    }
    smartBusInput.type = 'checkbox';
    smartBusInput.name = 'trans-data';
    smartBusInput.id = 'smartroutes';
    smartBusInput.value = 'smartroutes';
    if(_filterPanel.app.filters.includes('smartroutes')){
      smartBusInput.checked = true;
    }else{
      smartBusInput.checked = false;
    }
    smartBusInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    smartBusLabel.innerText = 'Smart Buses';
    smartBusLabel.setAttribute('for', 'smartroutes');
    smartBusLegend.className = 'line smart-bus';
    smartBusLabel.appendChild(smartBusLegend);
    transportationSubsets.appendChild(smartBusInput);
    transportationSubsets.appendChild(smartBusLabel);
    transportation.appendChild(transportationAllInput);
    transportation.appendChild(transportationAllLabel);
    transportation.appendChild(transportationAllExpandBtn);
    _filterPanel.form.appendChild(transportation);
    _filterPanel.form.appendChild(transportationSubsets);
    // let zipCodes = document.createElement('article');
    // let zipCodesInput = document.createElement('input');
    // let zipCodesList = document.createElement('datalist');
    // let zipCodesInputLabel = document.createElement('label');
    // let zipCodesBtn = document.createElement('button');
    // zipCodesInput.type = 'text';
    // zipCodesInput.setAttribute('id', 'zipcode');
    // zipCodesInput.setAttribute('list','zipcodes');
    // zipCodesInput.setAttribute('placeholder','Enter zip code');
    // zipCodesInputLabel.innerText = 'By Zip code:';
    // zipCodesInputLabel.setAttribute('for', 'zipcode');
    // zipCodesList.setAttribute('id', 'zipcodes');
    // for (const [key, value] of Object.entries(_filterPanel.app.zips)) {
    //     let tempOption = document.createElement('option');
    //     tempOption.value = key;
    //     zipCodesList.appendChild(tempOption);
    // }
    // zipCodesBtn.innerText = 'x';
    // zipCodesBtn.id = 'zipcode-filter-btn';
    // if(_filterPanel.app.filters.zipcode == null){
    //     zipCodesBtn.className = 'filter-btn';
    // }else{
    //     zipCodesInput.value = _filterPanel.app.filters.zipcode;
    //     zipCodesBtn.className = 'filter-btn active';
    // }
    // zipCodesInput.addEventListener('change', (ev)=>{
    //     ev.preventDefault();
    //     if(ev.target.value != null){
    //         _filterPanel.app.applyFilters(ev, _filterPanel.app);
    //         _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    //     }
    // });
    // zipCodesBtn.addEventListener('click', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.removeFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // zipCodes.appendChild(zipCodesBtn);
    // zipCodes.appendChild(zipCodesInputLabel);
    // zipCodes.appendChild(zipCodesInput);
    // zipCodes.appendChild(zipCodesList);
    // _filterPanel.form.appendChild(zipCodes);
    
    // Create population section elemets
    // let populationTypes = {
    //     first: 'Select Type',
    //     Elderly: 'Elderly',
    //     Family: 'Family',
    //     Special_Needs_or_Disabled: 'Special Need or Disabled',
    //     Homeless: 'Homeless',
    //     Veterans: 'Veterans'
    // }
    // let population = document.createElement('article');
    // let populationSelect = document.createElement('select');
    // let populationSelectLabel = document.createElement('label');
    // let populationBtn = document.createElement('button');
    // let populationDesc = document.createElement('p');
    // populationSelect.setAttribute('id', 'population');
    // populationSelect.setAttribute('aria-describedby','population-description');
    // for (const [key, value] of Object.entries(populationTypes)) {
    //     let tempOption = document.createElement('option');
    //     if(key == 'first'){
    //         tempOption.value = null;
    //     }else{
    //         tempOption.value = key;
    //     }
    //     tempOption.innerText = value;
    //     populationSelect.appendChild(tempOption);
    // }
    // populationSelectLabel.innerText = 'For Special Populations:';
    // populationSelectLabel.setAttribute('for', 'population');
    // populationBtn.innerText = 'x';
    // populationBtn.id = 'population-filter-btn';
    // if(_filterPanel.app.filters.population == null){
    //     populationBtn.className = 'filter-btn';
    //     populationSelect.value = '';
    // }else{
    //     populationSelect.value = _filterPanel.app.filters.population;
    //     populationBtn.className = 'filter-btn active';
    // }
    // populationDesc.innerText = '(Examples: elderly, veterans, families, etc.)';
    // populationDesc.id = 'population-description';
    // populationSelect.addEventListener('change', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.applyFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // populationBtn.addEventListener('click', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.removeFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // population.appendChild(populationBtn);
    // population.appendChild(populationSelectLabel);
    // population.appendChild(populationSelect);
    // population.appendChild(populationDesc);
    // _filterPanel.form.appendChild(population);

    // // Create bedrooms section elemets
    // let bedroomsTypes = {
    //     first: 'Select # of Bedrooms',
    //     Number_0BR: 'Studio',
    //     Number_1BR: '1 - Bedroom',
    //     Number_2BR: '2 - Bedroom',
    //     Number_3BR: '3 - Bedroom',
    //     Number_4BR: '4 - Bedroom',
    //     Number_5BR: '5 - Bedroom',
    // }
    // let bedrooms = document.createElement('article');
    // let bedroomsSelect = document.createElement('select');
    // let bedroomsSelectLabel = document.createElement('label');
    // let bedroomsBtn = document.createElement('button');
    // bedroomsSelect.setAttribute('id', 'rooms');
    // for (const [key, value] of Object.entries(bedroomsTypes)) {
    //     let tempOption = document.createElement('option');
    //     if(key == 'first'){
    //         tempOption.value = null;
    //     }else{
    //         tempOption.value = key;
    //     }
    //     tempOption.innerText = value;
    //     bedroomsSelect.appendChild(tempOption);
    // }
    // bedroomsSelectLabel.innerText = 'By Number of Bedrooms:';
    // bedroomsSelectLabel.setAttribute('for', 'rooms');
    // bedroomsBtn.innerText = 'x';
    // bedroomsBtn.id = 'bedrooms-filter-btn';
    // if(_filterPanel.app.filters.bedrooms == null){
    //     bedroomsBtn.className = 'filter-btn';
    // }else{
    //     bedroomsSelect.value = _filterPanel.app.filters.bedrooms;
    //     bedroomsBtn.className = 'filter-btn active';
    // }
    // bedroomsSelect.addEventListener('change', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.applyFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // bedroomsBtn.addEventListener('click', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.removeFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // bedrooms.appendChild(bedroomsBtn);
    // bedrooms.appendChild(bedroomsSelectLabel);
    // bedrooms.appendChild(bedroomsSelect);
    // _filterPanel.form.appendChild(bedrooms);

    // // Create Income elements
    // let income = document.createElement('article');
    // let incomeBtn = document.createElement('button');
    // let calcBtn = document.createElement('button');
    // incomeBtn.innerText = 'x';
    // incomeBtn.id = 'income-filter-btn';
    // incomeBtn.className = 'filter-btn';
    // if(_filterPanel.app.filters.incomeBucket == null){
    //     calcBtn.innerText = 'Search by Income';
    //     calcBtn.className = 'off';
    //     incomeBtn.className = 'filter-btn';
    // }else{
    //     calcBtn.innerText = 'By Income';
    //     calcBtn.className = 'on';
    //     incomeBtn.className = 'filter-btn active';
    // }
    // incomeBtn.addEventListener('click', (ev)=>{
    //     ev.preventDefault();
    //     _filterPanel.app.removeFilters(ev, _filterPanel.app);
    //     _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'filter');
    // });
    // calcBtn.addEventListener('click', (ev)=>{
    //     ev.preventDefault();
    //     if(ev.target.className == 'off'){
    //         _filterPanel.app.panel.createPanel(_filterPanel.app.panel, 'calculator');
    //     }
    // });
    // income.appendChild(incomeBtn);
    // income.appendChild(calcBtn);
    // _filterPanel.form.appendChild(income);

    // // Create Income legend elements
    // let legend = document.createElement('article');
    // let best = document.createElement('p');
    // let maybe = document.createElement('p');
    // best.innerHTML = '<span>x</span> Best match for your income';
    // maybe.innerHTML = '<span>x</span> May have units affordable for your income';
    // if(_filterPanel.app.filters.incomeBucket == null){
    //     legend.className = 'legend';
    // }else{
    //     legend.className = 'legend active';
    // }
    // legend.appendChild(best);
    // legend.appendChild(maybe);
    // _filterPanel.form.appendChild(legend);

    // Handle submits
    _filterPanel.form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        console.log(ev);
    });
    container.appendChild(_filterPanel.form);
  }
}
