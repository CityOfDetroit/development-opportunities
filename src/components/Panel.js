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

    buildPropertyInfo(_panel){
        console.log('building property panel');
        let markup = `
        <h2>${_panel.app.propertyData.propaddr}</h2>
        <section class="group">
        <span class="header">KEY DATA</span>
        <p><strong>Owner:</strong> ${_panel.app.propertyData.taxpayer1}</p>
        <p><strong>Owner's Address:</strong> ${_panel.app.propertyData.taxpaddr}</p>
        </section>
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
        <h2>Map Settings</h2>
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
        console.log(_panel.panels);
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