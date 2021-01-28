'use strict';
import './Filters.scss';
export default class Filters {
  constructor(container, app) {
    this.form = null;
    this.expansion = {
        forSale         : false,
        transportation  : false,
        publicAssests   : false,
        planningHousing : false,
        zoning          : false
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
    if(ev.target.name.includes('zoning-data')){
      let zones = ev.target.value.split(',');
      let tempFilter = ['in', 'ZONING_REV'];
      zones.forEach((zone)=>{
        tempFilter.push(zone);
      });
      _filterPanel.app.map.map.setFilter(`${ev.target.name.charAt(0)}-zoning`, tempFilter);
      _filterPanel.app.map.map.setLayoutProperty(`${ev.target.name.charAt(0)}-zoning`, "visibility", visibility);
    }else{
      let layers = ev.target.value.split(',');
      _filterPanel.app.map.changeVisibility(layers, visibility, _filterPanel.app.map);
    }
    if(ev.target.className == 'parent-filter'){
      _filterPanel.changeSubsets(ev, _filterPanel);
    }
  }

  changeSubsets(ev, _filterPanel){
    console.log(ev.target.value);
    let filterSet = ev.target.value.split(',');
    console.log(filterSet);
    if(ev.target.checked){
      filterSet.forEach(filter => {
        if(!_filterPanel.app.filters.includes(filter)){
          _filterPanel.app.filters.push(filter);
        }
      });
    }else{
      let original = _filterPanel.app.filters;
      let newList = _filterPanel.app.filters;
      filterSet.forEach(filter => {
        console.log(filter);
        if(original.includes(filter)){
          newList = newList.filter(function(value, index, arr){ 
            return value != filter;
          });
        }
        console.log(newList);
      });
      _filterPanel.app.filters = newList;
    }
    _filterPanel.removeForm(_filterPanel.container);
    _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
  }

  buidlForm(container, _filterPanel){
    _filterPanel.form = document.createElement('form');

    // ========= Create public assets sections =========
    let forSale = document.createElement('article');
    let forSaleAllInput = document.createElement('input');
    let forSaleAllLabel = document.createElement('label');
    let forSaleAllExpandBtn = document.createElement('button');
    let forSaleSubsets = document.createElement('article');
    let marijuanaLegacyLandInput = document.createElement('input');
    let marijuanaLegacyLandLegend = document.createElement('span');
    let marijuanaLegacyLandLabel = document.createElement('label');
    let marijuanaLegacyLandBox = document.createElement('div');
    let marijuanaLegacyStructureInput = document.createElement('input');
    let marijuanaLegacyStructureLegend = document.createElement('span');
    let marijuanaLegacyStructureLabel = document.createElement('label');
    let marijuanaLegacyStructureBox = document.createElement('div');
    forSale.className ='parent-filter-container';
    forSaleAllInput.type = 'checkbox';
    forSaleAllInput.value = 'marijuana-legacy-structure,marijuana-legacy-land'
    forSaleAllInput.id = 'forSale-all';
    forSaleAllInput.name = 'forSale-data'; 
    if(_filterPanel.app.filters.includes('forSale-all')){
      forSaleAllInput.checked = true;
    }else{
      forSaleAllInput.checked = false;
    }
    forSaleAllInput.className = 'parent-filter';
    forSaleAllLabel.innerText = 'Public Properties for Sale';
    forSaleAllLabel.setAttribute('for', 'forSale-all');
    forSaleAllExpandBtn.type = 'expand';
    forSaleAllInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    if(_filterPanel.expansion.forSale){
        forSaleAllExpandBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }else{
        forSaleAllExpandBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
    forSaleAllExpandBtn.addEventListener('click', (ev)=>{
        (_filterPanel.expansion.forSale) ? _filterPanel.expansion.forSale = false : _filterPanel.expansion.forSale = true;
        _filterPanel.removeForm(_filterPanel.container);
        _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
    });
    if(_filterPanel.expansion.forSale){
      forSaleSubsets.className = 'filter-subset active';
    }else{
      forSaleSubsets.className = 'filter-subset';
    }

    // marijuana legacy land
    marijuanaLegacyLandInput.type = 'checkbox';
    marijuanaLegacyLandInput.name = 'trans-data';
    marijuanaLegacyLandInput.id = 'marijuana-legacy-land';
    marijuanaLegacyLandInput.value = 'marijuana-legacy-land';
    if(_filterPanel.app.filters.includes('marijuana-legacy-land')){
      marijuanaLegacyLandInput.checked = true;
    }else{
      marijuanaLegacyLandInput.checked = false;
    }
    marijuanaLegacyLandInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    marijuanaLegacyLandLabel.innerText = 'Marijuana Legacy Land';
    marijuanaLegacyLandLabel.setAttribute('for', 'marijuana-legacy-land');
    marijuanaLegacyLandLegend.className = 'circle marijuana-land';
    marijuanaLegacyLandLabel.appendChild(marijuanaLegacyLandLegend);
    marijuanaLegacyLandBox.appendChild(marijuanaLegacyLandInput);
    marijuanaLegacyLandBox.appendChild(marijuanaLegacyLandLabel);
    forSaleSubsets.appendChild(marijuanaLegacyLandBox);

    // marijuana legacy structure
    marijuanaLegacyStructureInput.type = 'checkbox';
    marijuanaLegacyStructureInput.name = 'trans-data';
    marijuanaLegacyStructureInput.id = 'marijuana-legacy-structure';
    marijuanaLegacyStructureInput.value = 'marijuana-legacy-structure';
    if(_filterPanel.app.filters.includes('marijuana-legacy-structure')){
      marijuanaLegacyStructureInput.checked = true;
    }else{
      marijuanaLegacyStructureInput.checked = false;
    }
    marijuanaLegacyStructureInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    marijuanaLegacyStructureLabel.innerText = 'Marijuana Legacy Structures';
    marijuanaLegacyStructureLabel.setAttribute('for', 'marijuana-legacy-structure');
    marijuanaLegacyStructureLegend.className = 'circle marijuana-structure';
    marijuanaLegacyStructureLabel.appendChild(marijuanaLegacyStructureLegend);
    marijuanaLegacyStructureBox.appendChild(marijuanaLegacyStructureInput);
    marijuanaLegacyStructureBox.appendChild(marijuanaLegacyStructureLabel);
    forSaleSubsets.appendChild(marijuanaLegacyStructureBox);

    forSale.appendChild(forSaleAllInput);
    forSale.appendChild(forSaleAllLabel);
    forSale.appendChild(forSaleAllExpandBtn);
    _filterPanel.form.appendChild(forSale);
    _filterPanel.form.appendChild(forSaleSubsets);

    // ========= Create public assets sections =========
    let publicAssests = document.createElement('article');
    let publicAssestsAllInput = document.createElement('input');
    let publicAssestsAllLabel = document.createElement('label');
    let publicAssestsAllExpandBtn = document.createElement('button');
    let publicAssestsSubsets = document.createElement('article');
    let fireInput = document.createElement('input');
    let fireLegend = document.createElement('span');
    let fireLabel = document.createElement('label');
    let fireBox = document.createElement('div');
    let parksInput = document.createElement('input');
    let parksLegend = document.createElement('span');
    let parksLabel = document.createElement('label');
    let parksBox = document.createElement('div');
    publicAssests.className ='parent-filter-container';
    publicAssestsAllInput.type = 'checkbox';
    publicAssestsAllInput.value = 'fire-stations,parks-fill,parks-line'
    publicAssestsAllInput.id = 'publicAssests-all';
    publicAssestsAllInput.name = 'publicAssests-data'; 
    if(_filterPanel.app.filters.includes('publicAssests-all')){
      publicAssestsAllInput.checked = true;
    }else{
      publicAssestsAllInput.checked = false;
    }
    publicAssestsAllInput.className = 'parent-filter';
    publicAssestsAllLabel.innerText = 'Public Assets';
    publicAssestsAllLabel.setAttribute('for', 'publicAssests-all');
    publicAssestsAllExpandBtn.type = 'expand';
    publicAssestsAllInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    if(_filterPanel.expansion.publicAssests){
        publicAssestsAllExpandBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }else{
        publicAssestsAllExpandBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
    publicAssestsAllExpandBtn.addEventListener('click', (ev)=>{
        (_filterPanel.expansion.publicAssests) ? _filterPanel.expansion.publicAssests = false : _filterPanel.expansion.publicAssests = true;
        _filterPanel.removeForm(_filterPanel.container);
        _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
    });
    if(_filterPanel.expansion.publicAssests){
      publicAssestsSubsets.className = 'filter-subset active';
    }else{
      publicAssestsSubsets.className = 'filter-subset';
    }

    // fire stations
    fireInput.type = 'checkbox';
    fireInput.name = 'trans-data';
    fireInput.id = 'fire-stations';
    fireInput.value = 'fire-stations';
    if(_filterPanel.app.filters.includes('fire-stations')){
      fireInput.checked = true;
    }else{
      fireInput.checked = false;
    }
    fireInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    fireLabel.innerText = 'Fire Stations';
    fireLabel.setAttribute('for', 'fire-stations');
    fireLegend.className = 'circle fire';
    fireLabel.appendChild(fireLegend);
    fireBox.appendChild(fireInput);
    fireBox.appendChild(fireLabel);
    publicAssestsSubsets.appendChild(fireBox);

    // active parks
    parksInput.type = 'checkbox';
    parksInput.name = 'trans-data';
    parksInput.id = 'active-parks';
    parksInput.value = 'parks-fill,parks-line';
    if(_filterPanel.app.filters.includes('parks-fill')){
      parksInput.checked = true;
    }else{
      parksInput.checked = false;
    }
    parksInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    parksLabel.innerText = 'Active Parks';
    parksLabel.setAttribute('for', 'active-parks');
    parksLegend.className = 'square parks';
    parksLabel.appendChild(parksLegend);
    parksBox.appendChild(parksInput);
    parksBox.appendChild(parksLabel);
    publicAssestsSubsets.appendChild(parksBox);

    publicAssests.appendChild(publicAssestsAllInput);
    publicAssests.appendChild(publicAssestsAllLabel);
    publicAssests.appendChild(publicAssestsAllExpandBtn);
    _filterPanel.form.appendChild(publicAssests);
    _filterPanel.form.appendChild(publicAssestsSubsets);

    // ========= Create planning and housing sections =========
    let planningHousing = document.createElement('article');
    let planningHousingAllInput = document.createElement('input');
    let planningHousingAllLabel = document.createElement('label');
    let planningHousingAllExpandBtn = document.createElement('button');
    let planningHousingSubsets = document.createElement('article');
    let oppZonesInput = document.createElement('input');
    let oppZonesLegend = document.createElement('span');
    let oppZonesLabel = document.createElement('label');
    let oppZonesBox = document.createElement('div');
    let snfInput = document.createElement('input');
    let snfLegend = document.createElement('span');
    let snfLabel = document.createElement('label');
    let snfBox = document.createElement('div');
    let tmahInput = document.createElement('input');
    let tmahLegend = document.createElement('span');
    let tmahLabel = document.createElement('label');
    let tmahBox = document.createElement('div');
    planningHousing.className ='parent-filter-container';
    planningHousingAllInput.type = 'checkbox';
    planningHousingAllInput.value = 'opp-zones-fill,opp-zones-line,snf-fill,snf-line,tmah-fill,tmah-line'
    planningHousingAllInput.id = 'planningHousing-all';
    planningHousingAllInput.name = 'planningHousing-data'; 
    if(_filterPanel.app.filters.includes('planningHousing-all')){
      planningHousingAllInput.checked = true;
    }else{
      planningHousingAllInput.checked = false;
    }
    planningHousingAllInput.className = 'parent-filter';
    planningHousingAllLabel.innerText = 'Planning and Housing';
    planningHousingAllLabel.setAttribute('for', 'planningHousing-all');
    planningHousingAllExpandBtn.type = 'expand';
    planningHousingAllInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    if(_filterPanel.expansion.planningHousing){
        planningHousingAllExpandBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }else{
        planningHousingAllExpandBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
    planningHousingAllExpandBtn.addEventListener('click', (ev)=>{
        (_filterPanel.expansion.planningHousing) ? _filterPanel.expansion.planningHousing = false : _filterPanel.expansion.planningHousing = true;
        _filterPanel.removeForm(_filterPanel.container);
        _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
    });
    if(_filterPanel.expansion.planningHousing){
      planningHousingSubsets.className = 'filter-subset active';
    }else{
      planningHousingSubsets.className = 'filter-subset';
    }

    // Opportunity zones
    oppZonesInput.type = 'checkbox';
    oppZonesInput.name = 'trans-data';
    oppZonesInput.id = 'opp-zones';
    oppZonesInput.value = 'opp-zones-fill,opp-zones-line';
    if(_filterPanel.app.filters.includes('opp-zones-fill')){
      oppZonesInput.checked = true;
    }else{
      oppZonesInput.checked = false;
    }
    oppZonesInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    oppZonesLabel.innerText = 'Opportunity Zones';
    oppZonesLabel.setAttribute('for', 'opp-zones');
    oppZonesLegend.className = 'square opp-zones';
    oppZonesLabel.appendChild(oppZonesLegend);
    oppZonesBox.appendChild(oppZonesInput);
    oppZonesBox.appendChild(oppZonesLabel);
    planningHousingSubsets.appendChild(oppZonesBox);

    // Strategic Neighborhoods
    snfInput.type = 'checkbox';
    snfInput.name = 'trans-data';
    snfInput.id = 'snf';
    snfInput.value = 'snf-fill,snf-line';
    if(_filterPanel.app.filters.includes('snf-fill')){
      snfInput.checked = true;
    }else{
      snfInput.checked = false;
    }
    snfInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    snfLabel.innerText = 'Strategic Neighborhood Fund';
    snfLabel.setAttribute('for', 'snf');
    snfLegend.className = 'square snf';
    snfLabel.appendChild(snfLegend);
    snfBox.appendChild(snfInput);
    snfBox.appendChild(snfLabel);
    planningHousingSubsets.appendChild(snfBox);

    // Targeted Multifamily Housing Areas
    tmahInput.type = 'checkbox';
    tmahInput.name = 'trans-data';
    tmahInput.id = 'tmah';
    tmahInput.value = 'tmah-fill,tmah-line';
    if(_filterPanel.app.filters.includes('tmah-fill')){
      tmahInput.checked = true;
    }else{
      tmahInput.checked = false;
    }
    tmahInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    tmahLabel.innerText = 'Targeted Multifamily Housing Areas';
    tmahLabel.setAttribute('for', 'tmah');
    tmahLegend.className = 'square tmah';
    tmahLabel.appendChild(tmahLegend);
    tmahBox.appendChild(tmahInput);
    tmahBox.appendChild(tmahLabel);
    planningHousingSubsets.appendChild(tmahBox);

    planningHousing.appendChild(planningHousingAllInput);
    planningHousing.appendChild(planningHousingAllLabel);
    planningHousing.appendChild(planningHousingAllExpandBtn);
    _filterPanel.form.appendChild(planningHousing);
    _filterPanel.form.appendChild(planningHousingSubsets);

    // ======= Create transportation section elemets ============
    let transportation = document.createElement('article');
    let transportationAllInput = document.createElement('input');
    let transportationAllLabel = document.createElement('label');
    let transportationAllExpandBtn = document.createElement('button');
    let transportationSubsets = document.createElement('article');
    let qLineInput = document.createElement('input');
    let qLineLegend = document.createElement('span');
    let qLineLabel = document.createElement('label');
    let qLineBox = document.createElement('div');
    let smartBusInput = document.createElement('input');
    let smartBusLegend = document.createElement('span');
    let smartBusLabel = document.createElement('label');
    let smartBusBox = document.createElement('div');
    let pMoverInput = document.createElement('input');
    let pMoverLegend = document.createElement('span');
    let pMoverLabel = document.createElement('label');
    let pMoverBox = document.createElement('div');
    let MoGoInput = document.createElement('input');
    let MoGoLegend = document.createElement('span');
    let MoGoLabel = document.createElement('label');
    let MoGoBox = document.createElement('div');
    transportation.className ='parent-filter-container';
    transportationAllInput.type = 'checkbox';
    transportationAllInput.value = 'smartroutes,qlineroute,qlinestops,peoplemover,mogobikes'
    transportationAllInput.id = 'transportation-all';
    transportationAllInput.name = 'trans-data';
    if(_filterPanel.app.filters.includes('transportation-all')){
      transportationAllInput.checked = true;
    }else{
      transportationAllInput.checked = false;
    }
    transportationAllInput.className = 'parent-filter';
    transportationAllLabel.innerText = 'Transportations';
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
    // QLine
    qLineInput.type = 'checkbox';
    qLineInput.name = 'trans-data';
    qLineInput.id = 'qlineroute';
    qLineInput.value = 'qlineroute,qlinestops';
    if(_filterPanel.app.filters.includes('qlineroute')){
      qLineInput.checked = true;
    }else{
      qLineInput.checked = false;
    }
    qLineInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    qLineLabel.innerText = 'Q-Line';
    qLineLabel.setAttribute('for', 'qlineroute');
    qLineLegend.className = 'line qline';
    qLineLabel.appendChild(qLineLegend);
    qLineBox.appendChild(qLineInput);
    qLineBox.appendChild(qLineLabel);
    transportationSubsets.appendChild(qLineBox);
    // Smart buses
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
    smartBusBox.appendChild(smartBusInput);
    smartBusBox.appendChild(smartBusLabel);
    transportationSubsets.appendChild(smartBusBox);
    // People mover
    pMoverInput.type = 'checkbox';
    pMoverInput.name = 'trans-data';
    pMoverInput.id = 'peoplemover';
    pMoverInput.value = 'peoplemover';
    if(_filterPanel.app.filters.includes('peoplemover')){
      pMoverInput.checked = true;
    }else{
      pMoverInput.checked = false;
    }
    pMoverInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    pMoverLabel.innerText = 'People Mover';
    pMoverLabel.setAttribute('for', 'peoplemover');
    pMoverLegend.className = 'line p-mover';
    pMoverLabel.appendChild(pMoverLegend);
    pMoverBox.appendChild(pMoverInput);
    pMoverBox.appendChild(pMoverLabel);
    transportationSubsets.appendChild(pMoverBox);
     // MoGo
     MoGoInput.type = 'checkbox';
     MoGoInput.name = 'trans-data';
     MoGoInput.id = 'mogobikes';
     MoGoInput.value = 'mogobikes';
     if(_filterPanel.app.filters.includes('mogobikes')){
       MoGoInput.checked = true;
     }else{
       MoGoInput.checked = false;
     }
     MoGoInput.addEventListener('change', (ev)=>{
       _filterPanel.updateFilters(ev, _filterPanel);
     });
     MoGoLabel.innerText = 'MoGo Bike Station';
     MoGoLabel.setAttribute('for', 'mogobikes');
     MoGoLegend.className = 'circle mogo';
     MoGoLabel.appendChild(MoGoLegend);
     MoGoBox.appendChild(MoGoInput);
     MoGoBox.appendChild(MoGoLabel);
     transportationSubsets.appendChild(MoGoBox);
   
    transportation.appendChild(transportationAllInput);
    transportation.appendChild(transportationAllLabel);
    transportation.appendChild(transportationAllExpandBtn);
    _filterPanel.form.appendChild(transportation);
    _filterPanel.form.appendChild(transportationSubsets);

    // ========= Create zoning sections =========
    let zoning = document.createElement('article');
    let zoningAllInput = document.createElement('input');
    let zoningAllLabel = document.createElement('label');
    let zoningAllExpandBtn = document.createElement('button');
    let zoningSubsets = document.createElement('article');
    let r1Input = document.createElement('input');
    let r1Legend = document.createElement('span');
    let r1Label = document.createElement('label');
    let r1Box = document.createElement('div');
    let r2Input = document.createElement('input');
    let r2Legend = document.createElement('span');
    let r2Label = document.createElement('label');
    let r2Box = document.createElement('div');
    let r3Input = document.createElement('input');
    let r3Legend = document.createElement('span');
    let r3Label = document.createElement('label');
    let r3Box = document.createElement('div');
    zoning.className ='parent-filter-container';
    zoningAllInput.type = 'checkbox';
    zoningAllInput.value = 'R1,R2,R3'
    zoningAllInput.id = 'r-zoning-all';
    zoningAllInput.name = 'r-zoning-data'; 
    if(_filterPanel.app.filters.includes('r-zoning-all')){
      zoningAllInput.checked = true;
    }else{
      zoningAllInput.checked = false;
    }
    zoningAllInput.className = 'parent-filter';
    zoningAllLabel.innerText = 'Residential Zoning';
    zoningAllLabel.setAttribute('for', 'r-zoning-all');
    zoningAllExpandBtn.type = 'expand';
    zoningAllInput.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    if(_filterPanel.expansion.zoning){
        zoningAllExpandBtn.innerHTML = '<i class="fas fa-minus"></i>';
    }else{
        zoningAllExpandBtn.innerHTML = '<i class="fas fa-plus"></i>';
    }
    zoningAllExpandBtn.addEventListener('click', (ev)=>{
        (_filterPanel.expansion.zoning) ? _filterPanel.expansion.zoning = false : _filterPanel.expansion.zoning = true;
        _filterPanel.removeForm(_filterPanel.container);
        _filterPanel.buidlForm(_filterPanel.container, _filterPanel);
    });
    if(_filterPanel.expansion.zoning){
      zoningSubsets.className = 'filter-subset active';
    }else{
      zoningSubsets.className = 'filter-subset';
    }

    // R1 zoning
    r1Input.type = 'checkbox';
    r1Input.name = 'r-zoning-data';
    r1Input.id = 'R1';
    r1Input.value = 'R1';
    if(_filterPanel.app.filters.includes('R1')){
      r1Input.checked = true;
    }else{
      r1Input.checked = false;
    }
    r1Input.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    r1Label.innerText = 'R1 - Zoning';
    r1Label.setAttribute('for', 'R1');
    r1Legend.className = 'line R1';
    r1Label.appendChild(r1Legend);
    r1Box.appendChild(r1Input);
    r1Box.appendChild(r1Label);
    zoningSubsets.appendChild(r1Box);

    // R2 zoning
    r2Input.type = 'checkbox';
    r2Input.name = 'r-zoning-data';
    r2Input.id = 'R2';
    r2Input.value = 'R2';
    if(_filterPanel.app.filters.includes('R2')){
      r2Input.checked = true;
    }else{
      r2Input.checked = false;
    }
    r2Input.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    r2Label.innerText = 'R2 - Zoning';
    r2Label.setAttribute('for', 'R2');
    r2Legend.className = 'line R2';
    r2Label.appendChild(r2Legend);
    r2Box.appendChild(r2Input);
    r2Box.appendChild(r2Label);
    zoningSubsets.appendChild(r2Box);

    // R2 zoning
    r2Input.type = 'checkbox';
    r2Input.name = 'r-zoning-data';
    r2Input.id = 'R2';
    r2Input.value = 'R2';
    if(_filterPanel.app.filters.includes('R2')){
      r2Input.checked = true;
    }else{
      r2Input.checked = false;
    }
    r2Input.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    r2Label.innerText = 'R2 - Zoning';
    r2Label.setAttribute('for', 'R2');
    r2Legend.className = 'line R2';
    r2Label.appendChild(r2Legend);
    r2Box.appendChild(r2Input);
    r2Box.appendChild(r2Label);
    zoningSubsets.appendChild(r2Box);

    // R3 zoning
    r3Input.type = 'checkbox';
    r3Input.name = 'r-zoning-data';
    r3Input.id = 'R3';
    r3Input.value = 'R3';
    if(_filterPanel.app.filters.includes('R3')){
      r3Input.checked = true;
    }else{
      r3Input.checked = false;
    }
    r3Input.addEventListener('change', (ev)=>{
      _filterPanel.updateFilters(ev, _filterPanel);
    });
    r3Label.innerText = 'R3 - Zoning';
    r3Label.setAttribute('for', 'R3');
    r3Legend.className = 'line R3';
    r3Label.appendChild(r3Legend);
    r3Box.appendChild(r3Input);
    r3Box.appendChild(r3Label);
    zoningSubsets.appendChild(r3Box);

    zoning.appendChild(zoningAllInput);
    zoning.appendChild(zoningAllLabel);
    zoning.appendChild(zoningAllExpandBtn);
    _filterPanel.form.appendChild(zoning);
    _filterPanel.form.appendChild(zoningSubsets);

    // Handle submits
    _filterPanel.form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        console.log(ev);
    });
    container.appendChild(_filterPanel.form);
  }
}
