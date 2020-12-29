import { Map, NavigationControl } from 'maplibre-gl'
import mapStyle from './style.json';
import './Map.scss';
import '../../node_modules/maplibre-gl/dist/mapbox-gl.css';
import videoIcon from '../img/video.png'

export default class Maps {
    constructor(container, app) {
        this.app = app;
        this.svCoords = {
            lng: -83.1,
            lat: 42.36
        }
        this.svBearing = 180;
        this.map = new Map({
            container: container, // container id
            style: mapStyle, // stylesheet location
            center: [this.svCoords.lng,this.svCoords.lat], // starting position [lng, lat]
            zoom: 12, // starting zoom
        });
        this.init(this);
    }

    init(_map){
        _map.map.addControl(new NavigationControl());
        _map.map.on("load", function () {
            // Creating sources
            // _map.map.addSource("zoning", {
            //   type: "vector",
            //   url: "mapbox://cityofdetroit.5kwrqmxx",
            // });
            _map.map.addSource('markers', {
              type: 'geojson',
              data: {
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [12.695600612967427, 56.04351888068181],
                  },
                  properties: { },
              },
            });
            _map.map.addSource("completed-planning-projects", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27%27+AND+Status+%3D+%27Completed%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("planning-areas", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("mcm-business", {
              type: "geojson",
              data:
                "https://opendata.arcgis.com/datasets/76e09cb0417a452aba99608ccf40f116_0.geojson",
            });
            _map.map.addSource("mc-restore", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/MCRS_Awardees/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
            });
            _map.map.addSource("vacant-multi", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/rosaparks_clairmount_mf/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("snf-areas", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27SNF%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("open-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Open+to+Submissions%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("predevelopment-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Pre-Development%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("in-construction-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27In+Construction%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("completed-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Completed%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("targeted-multi-family-housing", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Targeted_Multifamily_Affordable_Housing/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            _map.map.addSource("peoplemover", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Detroit_People_Mover_Route/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            _map.map.addSource("mogobikes", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/MoGo_Bike_Share_Locations/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            _map.map.addSource("smartroutes", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/SMART_Bus_Routes/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            _map.map.addSource("qlineroute", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/QLine_Route/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            _map.map.addSource("qlinestops", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/QLine_Stops/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            // Creating layers
            // _map.map.addLayer({
            //     id: "zoning",
            //     type: "line",
            //     source: "zoning",
            //     "source-layer": "zoninggeojson",
            //     layout: { visibility: "none" },
            //     paint: {
            //       "line-color": {
            //         property: "zoning_rev",
            //         type: "categorical",
            //         stops: [
            //           ["B1", "#b16776"],
            //           ["B2", "#ca5572"],
            //           ["B3", "#e2396f"],
            //           ["B4", "#aa0044"],
            //           ["B5", "#952347"],
            //           ["B6", "#74001e"],
            //           ["M1", "#986eac"],
            //           ["M2", "#a265c2"],
            //           ["M3", "#ab5ad8"],
            //           ["M4", "#713891"],
            //           ["M5", "#792aa6"],
            //           ["P1", "#72a553"],
            //           ["PC", "#72a553"],
            //           ["PCA", "#72a553"],
            //           ["PD", "#72a553"],
            //           ["PR", "#72a553"],
            //           ["R1", "#8195ae"],
            //           ["R2", "#6097ce"],
            //           ["R3", "#009aee"],
            //           ["R4", "#006cbb"],
            //           ["R5", "#29699d"],
            //           ["R6", "#00428a"],
            //           ["SD1", "#c57c3d"],
            //           ["SD2", "#c57c3d"],
            //           ["SD4", "#c57c3d"],
            //           ["SD5", "#c57c3d"],
            //           ["TM", "#c57c3d"],
            //           ["W1", "#c57c3d"],
            //         ],
            //       },
            //       "line-width": {
            //         stops: [
            //           [14, 1],
            //           [19, 15],
            //         ],
            //       },
            //       "line-offset": {
            //         stops: [
            //           [14, 0],
            //           [17, -1],
            //           [19, -6],
            //         ],
            //       },
            //     },
            //   });
              _map.map.addLayer({
                  id: 'markers',
                  type: 'symbol',
                  source: 'markers',
                  layout: {
                      'icon-image': '{marker-symbol}-15',
                  },
              });
              _map.map.addLayer({
                id: "targeted-multi-family-fill",
                type: "fill",
                source: "targeted-multi-family-housing",
                layout: { visibility: "none" },
                paint: { "fill-color": "#657d9b", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "targeted-multi-family-line",
                type: "line",
                source: "targeted-multi-family-housing",
                layout: { visibility: "none" },
                paint: { "line-color": "#324965" },
              });
              _map.map.addLayer({
                id: "peoplemover",
                type: "line",
                source: "peoplemover",
                layout: { visibility: "none" },
                paint: { "line-color": "#2c5490", "line-width": 2 },
              });
              _map.map.addLayer({
                id: "smartroutes",
                type: "line",
                source: "smartroutes",
                layout: { visibility: "none" },
                paint: { "line-color": "#d70000", "line-width": 2 },
              });
              _map.map.addLayer({
                id: "mogobikes",
                type: "circle",
                source: "mogobikes",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 5,
                    stops: [
                      [12, 5],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#ee382a",
                },
              });
              _map.map.addLayer({
                id: "qlinestops",
                type: "circle",
                source: "qlinestops",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 5,
                    stops: [
                      [12, 5],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#7fb6ab",
                },
              });
              _map.map.addLayer({
                id: "qlineroute",
                type: "line",
                source: "qlineroute",
                layout: { visibility: "none" },
                paint: { "line-color": "#7fb6ab", "line-width": 2 },
              });
              
              _map.map.addLayer({
                id: "mcm-business",
                type: "circle",
                source: "mcm-business",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 4,
                    stops: [
                      [12, 4],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#d26e03",
                },
              });
              _map.map.addLayer({
                id: "mc-restore",
                type: "circle",
                source: "mc-restore",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 4,
                    stops: [
                      [12, 4],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#004445",
                },
              });
        
              _map.map.addLayer({
                id: "vacant-multi-fill",
                type: "fill",
                source: "vacant-multi",
                layout: { visibility: "none" },
                paint: { "fill-color": "#f44289", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "vacant-multi-line",
                type: "line",
                source: "vacant-multi",
                layout: { visibility: "none" },
                paint: { "line-color": "#a5295b" },
              });
              _map.map.addLayer({
                id: "in-construction-rfp-fill",
                type: "fill",
                source: "in-construction-rfp",
                layout: { visibility: "none" },
                paint: { "fill-color": "#b94dba", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "in-construction-rfp-line",
                type: "line",
                source: "in-construction-rfp",
                layout: { visibility: "none" },
                paint: { "line-color": "#b81aba" },
              });
              _map.map.addLayer({
                id: "open-rfp-fill",
                type: "fill",
                source: "open-rfp",
                layout: { visibility: "none" },
                paint: { "fill-color": "#ff68ff", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "open-rfp-line",
                type: "line",
                source: "open-rfp",
                layout: { visibility: "none" },
                paint: { "line-color": "#c56bc5" },
              });
              _map.map.addLayer({
                id: "predevelopment-rfp-fill",
                type: "fill",
                source: "predevelopment-rfp",
                layout: { visibility: "none" },
                paint: { "fill-color": "#933c94", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "predevelopment-rfp-line",
                type: "line",
                source: "predevelopment-rfp",
                layout: { visibility: "none" },
                paint: { "line-color": "#5f0b60" },
              });
              _map.map.addLayer({
                id: "completed-rfp-fill",
                type: "fill",
                source: "completed-rfp",
                layout: { visibility: "none" },
                paint: { "fill-color": "#643265", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "completed-rfp-line",
                type: "line",
                source: "completed-rfp",
                layout: { visibility: "none" },
                paint: { "line-color": "#5f0b60" },
              });
              _map.map.addLayer({
                id: "snf-fill",
                type: "fill",
                source: "snf-areas",
                layout: { visibility: "none" },
                paint: { "fill-color": "#ffff73", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "snf-line",
                type: "line",
                source: "snf-areas",
                layout: { visibility: "none" },
                paint: { "line-color": "#e89f18" },
              });
            //   _map.map.addLayer({
            //     id: "dlba-structures",
            //     type: "fill",
            //     source: "dlba-structures",
            //     "source-layer": "dlba_parcels",
            //     filter: ["==", "status", "DLBA Owned Structure"],
            //     layout: { visibility: "none" },
            //     paint: { "fill-color": "#53ade9" },
            //   });
            //   _map.map.addLayer({
            //     id: "dlba-vacant-lots",
            //     type: "fill",
            //     source: "dlba-vacant-lots",
            //     "source-layer": "dlba_parcels",
            //     filter: ["==", "status", "DLBA Owned Vacant Land"],
            //     layout: { visibility: "none" },
            //     paint: { "fill-color": "#8cc9f2" },
            //   });
            //   _map.map.addLayer({
            //     id: "dlba-side-lots",
            //     type: "fill",
            //     source: "dlba-side-lots",
            //     "source-layer": "dlba_parcels",
            //     filter: ["==", "status", "DLBA Owned Sidelot For Sale"],
            //     layout: { visibility: "none" },
            //     paint: { "fill-color": "#81b2d3" },
            //   });
            //   _map.map.addLayer({
            //     id: "dlba-properties",
            //     type: "fill",
            //     source: "dlba-properties",
            //     "source-layer": "dlba_one_off",
            //     layout: { visibility: "none" },
            //     paint: { "fill-color": "#ff6501" },
            //   });
              _map.map.addLayer({
                id: "completed-planning-projects-fill",
                type: "fill",
                source: "completed-planning-projects",
                layout: { visibility: "none" },
                paint: { "fill-color": "#39b54a", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "completed-planning-projects-line",
                type: "line",
                source: "completed-planning-projects",
                layout: { visibility: "none" },
                paint: { "line-color": "#2e9a3d" },
              });
              _map.map.addLayer({
                id: "planning-areas-fill",
                type: "fill",
                source: "planning-areas",
                layout: { visibility: "none" },
                paint: { "fill-color": "#b5e15c", "fill-opacity": 0.75 },
              });
              _map.map.addLayer({
                id: "planning-areas-line",
                type: "line",
                source: "planning-areas",
                layout: { visibility: "none" },
                paint: { "line-color": "#48ae18" },
              });
              // _map.map.addLayer({
              //   id: "parcel-fill",
              //   type: "fill",
              //   source: "parcels",
              //   minzoom: 13,
              //   layout: {},
              //   paint: { "fill-color": "#fff", "fill-opacity": 0 },
              //   "source-layer": "assessor_parcels-50m4yu",
              // });
              // _map.map.addLayer({
              //   id: "parcel-line",
              //   type: "line",
              //   source: "parcels",
              //   minzoom: 13,
              //   layout: {},
              //   paint: { "line-color": "#cbcbcb" },
              //   "source-layer": "assessor_parcels-50m4yu",
              // });
              // _map.map.addLayer({
              //   id: "parcel-fill-hover",
              //   type: "line",
              //   source: "parcels",
              //   minzoom: 13,
              //   layout: {},
              //   paint: { "line-color": "#a40040" },
              //   "source-layer": "assessor_parcels-50m4yu",
              //   filter: ["==", "parcelno", ""],
              // });

            _map.map.on('style.load', () => {
                _map.map.loadImage(videoIcon, (error, image) => {
                  if (error) throw error;
                  _map.map.addImage("video", image);
                  _map.map.setFilter("parcels-highlight", ["==", "parcelno", _map.app.parcel ? _map.app.parcel : ""]);
                  _map.svCoords && _map.map.getSource("mapillary").setData({
                    type: "FeatureCollection",
                    // we'll make the map data here
                    features: [
                      {
                        type: "Feature",
                        geometry: {
                          type: "Point",
                          coordinates: [_map.svCoords.lon, _map.svCoords.lat],
                        },
                        properties: {
                          bearing: _map.svBearing - 90,
                        },
                      },
                    ],
                  });
                });    
            });

            _map.map.on("click", "parcels-fill", function (e) {
                let parcel = _map.map.queryRenderedFeatures(e.point, {
                  layers: ["parcels-fill"],
                });
                _map.app.getImageKey(_map.app, e.lngLat.lng,e.lngLat.lat);
                _map.app.parcel = parcel[0].properties.parcelno;
                _map.map.flyTo({
                    center: [e.lngLat.lng,e.lngLat.lat],
                    zoom: 18,
                    essential: true // this animation is considered essential with respect to prefers-reduced-motion
                });
                _map.map.setFilter("parcels-highlight", ["==", "parcelno", _map.app.parcel ? _map.app.parcel : ""]);
                _map.app.getParcelData(_map.app);
                // setCoords(e.lngLat);
            });

            _map.map.on("click", function (e) {
              let parcel = _map.map.queryRenderedFeatures(e.point, {
                layers: ["parcels-fill"],
              });
              if(parcel.length < 1){
                _map.app.panel.dashLast = 'city';
                _map.app.panel.createPanel(_map.app.panel, 'dash');
              }
          });
        });
    }

    changeVisibility(layers, visibility, _map){
      layers.forEach(layer => {
        _map.map.setLayoutProperty(layer, "visibility", visibility);
      });
    }
}