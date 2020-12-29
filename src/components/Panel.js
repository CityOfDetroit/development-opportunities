import * as Mapillary from "mapillary-js";
import Filters from './Filters';
import './Panel.scss';
import '../../node_modules/mapillary-js/dist/mapillary.min.css';
export default class Panel {
    constructor(app) {
        this.app = app;
        this.calculator = null;
        this.filters = null;
        this.data = null;
        this.panels = [];
        this.dashLast = 'city';
        this.mly = null;
        this.formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    }

    closePanel(ev,_panel){
        let tempClass = ev.target.parentNode.parentNode.className;
        tempClass = tempClass.split(' ');
        ev.target.parentNode.parentNode.className = tempClass[0];
        // _panel.app.map.map.flyTo({
        //     center: [-83.1,42.36],
        //     zoom: 12,
        //     essential: true // this animation is considered essential with respect to prefers-reduced-motion
        // });
        try {
            while (ev.target.parentNode.firstChild) {
                ev.target.parentNode.removeChild(ev.target.parentNode.firstChild);
            }
        } catch (error) {
            // console.log(error);
        }
        _panel.panels.pop();
        // console.log(_panel.panels);
    }

    // <p><strong>Last Sale Date:</strong> ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p><p><strong>Last Sale Price:</strong> ${_panel.formatter(_panel.app.propertyData.saleprice)}</p>
    buildPropertyInfo(_panel){
        console.log('building property panel');
        let date = null;
        if(_panel.app.propertyData.saledate != null){
            date = new Date(_panel.app.propertyData.saledate);
        }
        let markup = `
        <h2>${_panel.app.propertyData.propaddr}</h2>
        <section id="mly"></section>
        <section class="group">
        <span class="header">KEY DATA<sup>*</sup></span>
        <p><strong>Owner:</strong> ${_panel.app.propertyData.taxpayer1}</p>
        <p><strong>Owner's Address:</strong> ${_panel.app.propertyData.taxpaddr}</p>
        <p><strong>Zoning:</strong> ${_panel.app.propertyData.zoning}</p>
        <p><strong>Council District:</strong> ${_panel.app.propertyData.council}</p>
        </section>
        <section class="group">
        <span class="header">ADDITIONAL DATA</span>
        ${date != null ? `<p><strong>Last Sale Date:</strong> ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p><p><strong>Last Sale Price:</strong> ${_panel.formatter.format(_panel.app.propertyData.saleprice)}</p>` : ``}
        <p><strong>Parcel Number:</strong> ${_panel.app.propertyData.parcelno}</p>
        <p><strong>Taxable Status:</strong> ${_panel.app.propertyData.taxstatus}</p>
        <p><strong>Total Acreage:</strong> ${_panel.app.propertyData.totalacreage}</p>
        <p><strong>Principal Residence Exemption:</strong> ${_panel.app.propertyData.pre}</p>
        <p><strong>Frontage:</strong> ${_panel.app.propertyData.frontage}</p>
        <p><strong>Depth:</strong> ${_panel.app.propertyData.depth}</p>
        <p><strong>Ward:</strong> ${_panel.app.propertyData.ward}</p>
        </section>
        <small><sup>*</sup>City Owned Property data is sourced from the City of Detroit’s Office of the Assessor. If you find any discrepancies please visit the Coleman A. Young Municipal Center at 2 Woodward Avenue - Suite 804 Detroit, Michigan 48226 or call (313) 224-3035</small>
        `;
        return markup;
    }

    createErrorMsg(_panel){
        let tempPanel = document.querySelector('.panel .panel-box');
        let closeBtn = document.createElement('button');
        closeBtn.innerText = 'x';
        closeBtn.className = 'close-section-btn';
        closeBtn.addEventListener("click", function(e){
            e.preventDefault();
            _panel.closePanel(e);
        });
        tempPanel.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="70" viewBox="0 0 100 68">
        <g id="large">
            <path fill="none" stroke="#F44" d="M55.8 38.5l6.2-1.2c0-1.8-.1-3.5-.4-5.3l-6.3-.2c-.5-2-1.2-4-2.1-6l4.8-4c-.9-1.6-1.9-3-3-4.4l-5.6 3c-1.3-1.6-3-3-4.7-4.1l2-6A30 30 0 0 0 42 8l-3.3 5.4c-2-.7-4.2-1-6.2-1.2L31.3 6c-1.8 0-3.5.1-5.3.4l-.2 6.3c-2 .5-4 1.2-6 2.1l-4-4.8c-1.6.9-3 1.9-4.4 3l3 5.6c-1.6 1.3-3 3-4.1 4.7l-6-2A32.5 32.5 0 0 0 2 26l5.4 3.3c-.7 2-1 4.2-1.2 6.2L0 36.7c0 1.8.1 3.5.4 5.3l6.3.2c.5 2 1.2 4 2.1 6l-4.8 4c.9 1.6 1.9 3 3 4.4l5.6-3c1.4 1.6 3 3 4.7 4.1l-2 6A30.5 30.5 0 0 0 20 66l3.4-5.4c2 .7 4 1 6.1 1.2l1.2 6.2c1.8 0 3.5-.1 5.3-.4l.2-6.3c2-.5 4-1.2 6-2.1l4 4.8c1.6-.9 3-1.9 4.4-3l-3-5.6c1.6-1.3 3-3 4.1-4.7l6 2A32 32 0 0 0 60 48l-5.4-3.3c.7-2 1-4.2 1.2-6.2zm-13.5 4a12.5 12.5 0 1 1-22.6-11 12.5 12.5 0 0 1 22.6 11z"/>
            <animateTransform attributeName="transform" begin="0s" dur="3s" from="0 31 37" repeatCount="indefinite" to="360 31 37" type="rotate"/>
        </g>
        <g id="small">
            <path fill="none" stroke="#F44" d="M93 19.3l6-3c-.4-1.6-1-3.2-1.7-4.8L90.8 13c-.9-1.4-2-2.7-3.4-3.8l2.1-6.3A21.8 21.8 0 0 0 85 .7l-3.6 5.5c-1.7-.4-3.4-.5-5.1-.3l-3-5.9c-1.6.4-3.2 1-4.7 1.7L70 8c-1.5 1-2.8 2-3.9 3.5L60 9.4a20.6 20.6 0 0 0-2.2 4.6l5.5 3.6a15 15 0 0 0-.3 5.1l-5.9 3c.4 1.6 1 3.2 1.7 4.7L65 29c1 1.5 2.1 2.8 3.5 3.9l-2.1 6.3a21 21 0 0 0 4.5 2.2l3.6-5.6c1.7.4 3.5.5 5.2.3l2.9 5.9c1.6-.4 3.2-1 4.8-1.7L86 34c1.4-1 2.7-2.1 3.8-3.5l6.3 2.1a21.5 21.5 0 0 0 2.2-4.5l-5.6-3.6c.4-1.7.5-3.5.3-5.1zM84.5 24a7 7 0 1 1-12.8-6.2 7 7 0 0 1 12.8 6.2z"/>
            <animateTransform attributeName="transform" begin="0s" dur="2s" from="0 78 21" repeatCount="indefinite" to="-360 78 21" type="rotate"/>
        </g>
        </svg>
        <h3>No Information found.</h3>
        `;
        tempPanel.prepend(closeBtn);
        document.querySelector('#app .panel').className = "panel active";
    }

    buildCityData(_panel){
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

    createImagery(_panel){
        console.log('building imagery');
        console.log(_panel.app.currentImageKey),
        _panel.mly = new Mapillary.Viewer({
            apiClient: _panel.app.mapillaryClientID,
            container: 'mly',
            component: {
                cover: false,
            },
            imageKey: _panel.app.currentImageKey.properties.key,
        });
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
        switch (_panel.panels[(_panel.panels.length - 1)]) {
            case 'dash':
                if(_panel.dashLast == 'city'){
                    tempPanel.innerHTML = `${_panel.buildCityData(_panel)}`;
                }else{
                    tempPanel.innerHTML = `${_panel.buildPropertyInfo(_panel)}`;
                }
                break;

            case 'filter':
                tempPanel.innerHTML = `${_panel.buildFilters(_panel)}`;
                _panel.filters = new Filters('filter-box', _panel.app);
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