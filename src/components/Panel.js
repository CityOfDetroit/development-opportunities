import Filters from './Filters';
import './Panel.scss';
export default class Panel {
    constructor(app) {
        this.app = app;
        this.calculator = null;
        this.filters = null;
        this.data = null;
        this.panels = [];
    }

    closePanel(ev,_panel){
        let tempClass = ev.target.parentNode.parentNode.className;
        tempClass = tempClass.split(' ');
        ev.target.parentNode.parentNode.className = tempClass[0];
        _panel.app.map.map.flyTo({
            center: [-83.1,42.36],
            zoom: 12,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        try {
            while (ev.target.parentNode.firstChild) {
                ev.target.parentNode.removeChild(ev.target.parentNode.firstChild);
            }
        } catch (error) {
            
        }
        _panel.panels.pop();
        // console.log(_panel.panels);
    }

    getPopulation(property){
        let population = '';
        if(property.Family != null){
            if(property.Homeless != null){
                if(property.Veterans != null){
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Homeless, Veterans, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family, Homeless, Veterans and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Homeless, Veterans and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family, Homeless and Veterans</p>`;
                        }
                    }
                }else{
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Homeless, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family, Homeless and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Homeless and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family and Homeless</p>`;
                        }
                    }
                }
            }else{
                if(property.Veterans != null){
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Veterans, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family, Veterans and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Veterans and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family and Veterans</p>`;
                        }
                    }
                }else{
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Family, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Family and Elderly</p>`;
                        }
                    }else{
                        population = `<p><strong>Population:</strong> Family</p>`;
                    }
                }
            }
        }else{
            if(property.Homeless != null){
                if(property.Veterans != null){
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Homeless, Veterans, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Homeless, Veterans and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Homeless, Veterans and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Homeless and Veterans</p>`;
                        }
                    }
                }else{
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Homeless, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Homeless and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Homeless and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Homeless</p>`;
                        }
                    }
                }
            }else{
                if(property.Veterans != null){
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Veterans, Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Veterans and Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Veterans and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Veterans</p>`;
                        }
                    }
                }else{
                    if(property.Elderly != null){
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> Elderly and 'Special Needs or Disabled'</p>`;
                        }else{
                            population = `<p><strong>Population:</strong> Elderly</p>`;
                        }
                    }else{
                        if(property.Special_Needs_or_Disabled != null){
                            population = `<p><strong>Population:</strong> 'Special Needs or Disabled'</p>`;
                        }else{
                            population = ``;
                        }
                    }
                }
            }
        }
        return population;
    }

    buildPropertyInfo(_panel){
        let markup = `
        <h2>${_panel.data.properties.Project_Name}</h2>
        <section class="group">
        <span class="header">Property</span>
        <p><strong>Address:</strong> ${_panel.data.properties.Project_Address}</p>
        <p><strong>Neighborhood:</strong> ${_panel.data.properties.Neighborhood}</p>
        ${_panel.data.properties.Structure != null ? `<p><strong>Structure:</strong> ${_panel.data.properties.Structure}</p>`:``}
        ${_panel.data.properties.Public_Housing == 'TRUE' ? `<p><strong>Detroit Housing Commission Public Housing:</strong> Yes`:`<p><strong>DHC Public Housing:</strong> No`}
        ${this.getPopulation(_panel.data.properties)}
        </section>
        <section class="group">
        <span class="header">Units</span>
        <p><strong>Rent-restricted:</strong> ${_panel.data.properties.Affordable_Units}</p>
        <p><strong>Total:</strong> ${_panel.data.properties.Total_Units}</p>
        ${_panel.data.properties.Number_0BR != null ? `<p><strong>Studio:</strong> ${_panel.data.properties.Number_0BR}</p>`:``}
        ${_panel.data.properties.Number_1BR != null ? `<p><strong>1-Bedroom:</strong> ${_panel.data.properties.Number_1BR}</p>`:``}
        ${_panel.data.properties.Number_2BR != null ? `<p><strong>2-Bedroom:</strong> ${_panel.data.properties.Number_2BR}</p>`:``}
        ${_panel.data.properties.Number_3BR != null ? `<p><strong>3-Bedroom:</strong> ${_panel.data.properties.Number_3BR}</p>`:``}
        ${_panel.data.properties.Number_4BR != null ? `<p><strong>4-Bedroom:</strong> ${_panel.data.properties.Number_4BR}</p>`:``}
        ${_panel.data.properties.Number_5BR != null ? `<p><strong>5-Bedroom:</strong> ${_panel.data.properties.Number_5BR}</p>`:``}
        </section>
        <section class="group">
        <span class="header">Management</span>
        ${_panel.data.properties.Property_Phone != null ? `<p><strong>Property Phone:</strong> <a href="tel:${_panel.data.properties.Property_Phone}">${_panel.data.properties.Property_Phone}</a></p>`:``}
        ${_panel.data.properties.Management_Company != null ? `<p><strong>Company:</strong> ${_panel.data.properties.Management_Company}</p>`:``}
        ${_panel.data.properties.Manager_Contact != null ? `<p><strong>Manager:</strong> ${_panel.data.properties.Manager_Contact}</p>`:``}
        ${_panel.data.properties.Manager_Phone != null ? `<p><strong>Manager's Phone:</strong> <a href="tel:${_panel.data.properties.Manager_Phone}">${_panel.data.properties.Manager_Phone}</a></p>`:``}
        ${_panel.data.properties.Management_Website != null ? `<p><strong>Website:</strong> <a href="http://${_panel.data.properties.Management_Website}" target="_blank">Link</a></p>`:``}
        </section>
        <section class="group">
        <span class="header">Learn more</span>
        <article class="sub-group">
            <a class="btn resource" href="/taxonomy/term/5441" target="_blank">What is affordable housing?</a>
            <a class="btn resource" href="/taxonomy/term/5446" target="_blank">Who is eligible?</a>
        </article>
        </section>
        <p><small>Properties may or may not have units available, and rents may vary. Property management contact information is continuously updated, as management may change. If you discover any information is not up to date, please submit a note using our <a href="https://app.smartsheet.com/b/form/1cc29c45f4694a7a97315dde550db40c" target="_blank">online form.</a></small></p>
        `;
        return markup;
    }

    buildDash(_panel){
        let markup = `
        <h2>City of Detroit</h2>
        <img alt="Photo of Detroit" src="https://detroitmi.gov/sites/detroitmi.localhost/files/styles/de2e/public/2018-11/detroit1.jpg">
        <section class="group">
        <span class="header">DEMOGRAPHICS</span>
        <p><strong>Population:</strong> 672,795</p>
        </section>
        <section class="group">
        <span class="header">REAL ESTATE</span>
        <p><strong>City-Owned Parcels:</strong> 9,221</p>
        <p><strong>DLBA Parcels:</strong> 83,557</p>
        <p><strong>Total RFP Developments:</strong> 27</p>
        <p><strong>Open BSEED Commercial Permits:</strong> 667</p>
        <p><strong>Open BSEED Residential Permits:</strong> 2,526</p>
        </section>
        <section class="group">
        <span class="header">INFRASTRUCTURE</span>
        <p><strong>City Owned Parks:</strong> 307</p>
        </section>
        <section class="group">
        <span class="header">RETAIL</span>
        <p><strong>Motor City Match Open Businesses:</strong> 57</p>
        <p><strong>Motor City Match Restore Recipients:</strong> 169</p>
        </section>
        `;
        return markup;
    }

    buildInfo(_panel){
        let markup = `
        <h2>Map Information</h2>
        <section class="group">
        <span class="header">DATA</span>
        <p>Opportunity Map data is sourced from the following: Detroit Open Data Portal, Detroit Land Bank Authority (DLBA), City of Detroit Assessors Office, Housing and Revitalization Department, Planning and Development Department, Detroit Economic Growth Corporation - Motor City Match and Motor City Restore, Data Driven Detroit, Buildings and Safety Engineering and Environment Department, Department of Transportation. In a few instances, DLBA data may be more up-to-date than the City of Detroit Assessors Office. For questions, please visit the City of Detroit Assessors Office and/or provide us direct feedback here.</p>
        </section>
        <section class="group">
        <span class="header">GLOSSARY</span>
        <p><strong>PUBLIC ASSETS</strong></p>
        <p>Detroit Land Bank Authority (DLBA) and the City of Detroit marketed properties for sale – Verify with the Detroit Building Authority and/or the DLBA for the most accurate information.</p>
        <p><strong>PRETAIL</strong></p>
        <p>Motor City Match and Motor City Restore are programs run by the Detroit Economic Growth Corporation that support entrepreneurs and existing small businesses.</p>
        <p><strong>PLANNING & HOUSING</strong></p>
        <p>There are several planning areas for different purposes city wide, explainations are below:</p>
        <ul>
        <li>Targeted Multifamily Housing Areas – identify areas of the city with stronger housing markets and active commercial corridors. Developers of both market-rate and affordable housing, are encouraged to focus in these areas. To understand more, please check out the Housing & Revitalization Department Developers Page.</li>
        <li>Planning Areas and Strategic Neighborhood Fund Investment Areas are areas are subject to City of Detroit led neighborhood planning studies that use community engagement to guide future public investment and development in neighborhoods.</li>
        <li>Streetscape Improvements – Publically funded streetscape improvements intended to promote walkability and small businesses.</li>
        </ul>
        <p><strong>DEVELOPMENT</strong></p>
        <p>Request for Proposals - Calls for development teams to develop publically owned parcels and/or structures</p>
        <p><strong>Residential Zoning</strong></p>
        <ul>
        <li>R1 Single-Family Residential District</li>
        <li>R2 Two-Family Residential District</li>
        <li>R3 Low Density Residential District</li>
        <li>R4 Thoroughfare Residential District</li>
        <li>R5 Medium Density Residential District</li>
        <li>R6 High Density Residential District</li>
        </ul>
        <p><strong>Business / Commercial Zoning</strong></p>
        <ul>
        <li>B1 Restricted Business District</li>
        <li>B2 Local Business and Residential District</li>
        <li>B3 Shopping District</li>
        <li>B4 General Business District</li>
        <li>B5 Major Business District</li>
        <li>B6 General Services District</li>
        </ul>
        <p><strong>Industrial District Zoning</strong></p>
        <ul>
        <li>M1 Limited Industrial District</li>
        <li>M2 Restricted Industrial District</li>
        <li>M3 General Industrial District</li>
        <li>M4 Intensive Industrial District</li>
        <li>M5 Special Industrial District</li>
        </ul>
        <p><strong>Special Districts</strong></p>
        <ul>
        <li>PD Planned Development District</li>
        <li>P1 Open Parking District</li>
        <li>PC Public Center District</li>
        <li>PCA Public Center Adjacent District (Restricted Central business District)</li>
        <li>TM Transitional-Industrial District</li>
        <li>PR Parks and Recreation District</li>
        <li>W1 Waterfront-Industrial District</li>
        <li>SD1 Special Development District, Small-Scale, Mixed-Use</li>
        <li>SD2 Special Development District, Mixed-Use</li>
        <li>SD3 Special Development District, Technology and Research</li>
        <li>SD4 Special Development District, Riverfront mixed use</li>
        <li>SD5 Special Development District, Casinos</li>
        </ul>
        <p><strong>PUBLIC TRANSPORTATION</strong></p>
        <p>DDOT Buses - Detroit Department of Transportation Bus Routes</p>
        
        <p>SMART Buses - Suburban Mobility Authority for Regional Transportation (SMART) is Southeast Michigan's only regional bus system</p>
        
        <p>QLine - 3.3 mile streetcar that rides along the Woodward Corridor</p>
        
        <p>People Mover - Elevated Train that routed throughout Downtown Detroit</p>
        
        <p>MoGo Bike Sharing - Bike rentals across the greater downtown</p>
        </section>
        `;
        return markup;
    }

    buildFilters(_panel){
        let markup = `
        <h2>Search for housing</h2>
        <article id="filter-box">
        </article>
        `;
        return markup;
    }

    buildCalculator(_panel){
        let markup = `
        <section class="calculator">
          <h2>Income Calculator</h2>
          <article id="calc-box"></article>
        </section>
        `;
        return markup;
    }

    createPanel(_panel, panelType){
        let tempPanel = document.querySelector('.panel .panel-box');
        let closeBtn = document.createElement('button');
        closeBtn.innerText = 'x';
        closeBtn.className = 'close-section-btn';
        closeBtn.addEventListener("click", function(e){
            e.preventDefault();
            _panel.closePanel(e, _panel);
        });
        if(!_panel.panels.includes(panelType)){
            _panel.panels.push(panelType);
        }
        // console.log(_panel.panels);
        switch (_panel.panels[(_panel.panels.length - 1)]) {
            case 'property':
                tempPanel.innerHTML = `${_panel.buildPropertyInfo(_panel)}`;
                break;

            case 'filter':
                tempPanel.innerHTML = `${_panel.buildFilters(_panel)}`;
                _panel.filters = new Filters('filter-box', _panel.app);
                break;

            case 'dash':
                tempPanel.innerHTML = `${_panel.buildDash(_panel)}`;
                break;

            case 'info':
                tempPanel.innerHTML = `${_panel.buildInfo(_panel)}`;
                break;
        
            default:
                break;
        }
        tempPanel.prepend(closeBtn);
        document.querySelector('#app .panel').className = "panel active";
    }
}