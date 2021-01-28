import { Map, NavigationControl } from 'maplibre-gl'
import mapStyle from './style.json';
import './Map.scss';
import '../../node_modules/maplibre-gl/dist/mapbox-gl.css';

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
            _map.map.addSource("zoning", {
              type: "vector",
              tiles: [
                'https://tiles.arcgis.com/tiles/qvkbeam7Wirps6zC/arcgis/rest/services/Zoning_Vector_Tiles/VectorTileServer/tile/{z}/{y}/{x}.pbf'
                ],
              'minzoom': 14,
              'maxzoom': 19
            });
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
            // ============= transportation sources ===========
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
            // ============= public assets sources ===========
            _map.map.addSource("fire-stations", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Firehouse_Locations/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=B8zV2NtyxBp0VWKV3RAz_X4EpXEh2bJbLN2ihY3Nq8uuT711dEOQ0AXCwODTBGNAxnyRJZy9yzVN0oUNPkh_vHD_fJnakFxIvqhKhfp25Us3HwdCLrP7yvrC_IAit5uRTB4Cde4WMb2UHQ0j1WHZQNb_j5ePlzw1rsjG-yXD3AKZq52MtTj5L6qAaaJikfc-7NcCkAcjp9PozgGVIGm2xrK9Nnv1h1mjxDlon_BegZI.",
            });
            _map.map.addSource("active-parks", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/Parks_Marijuana/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=B8zV2NtyxBp0VWKV3RAz_X4EpXEh2bJbLN2ihY3Nq8uuT711dEOQ0AXCwODTBGNAxnyRJZy9yzVN0oUNPkh_vHD_fJnakFxIvqhKhfp25Us3HwdCLrP7yvrC_IAit5uRTB4Cde4WMb2UHQ0j1WHZQNb_j5ePlzw1rsjG-yXD3AKZq52MtTj5L6qAaaJikfc-7NcCkAcjp9PozgGVIGm2xrK9Nnv1h1mjxDlon_BegZI.",
            });
            // ============= for sale sources ===========
            _map.map.addSource("marijuana-legacy-structure", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/City_Owned_Land_and_Structures_Set_Aside_for_Adult_Use_Marijuana/FeatureServer/1/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=B8zV2NtyxBp0VWKV3RAz_X4EpXEh2bJbLN2ihY3Nq8uuT711dEOQ0AXCwODTBGNAxnyRJZy9yzVN0oUNPkh_vHD_fJnakFxIvqhKhfp25Us3HwdCLrP7yvrC_IAit5uRTB4Cde4WMb2UHQ0j1WHZQNb_j5ePlzw1rsjG-yXD3AKZq52MtTj5L6qAaaJikfc-7NcCkAcjp9PozgGVIGm2xrK9Nnv1h1mjxDlon_BegZI.",
            });
            _map.map.addSource("marijuana-legacy-land", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/ArcGIS/rest/services/City_Owned_Land_and_Structures_Set_Aside_for_Adult_Use_Marijuana/FeatureServer/2/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=B8zV2NtyxBp0VWKV3RAz_X4EpXEh2bJbLN2ihY3Nq8uuT711dEOQ0AXCwODTBGNAxnyRJZy9yzVN0oUNPkh_vHD_fJnakFxIvqhKhfp25Us3HwdCLrP7yvrC_IAit5uRTB4Cde4WMb2UHQ0j1WHZQNb_j5ePlzw1rsjG-yXD3AKZq52MtTj5L6qAaaJikfc-7NcCkAcjp9PozgGVIGm2xrK9Nnv1h1mjxDlon_BegZI.",
            });
            // ============= planning and housing sources ===========
            _map.map.addSource("opp-zones", {
              type: "geojson",
              data:
                "https://opendata.arcgis.com/datasets/4e50576fb1ee4a2db4208c220747831b_0.geojson",
            });
            _map.map.addSource("snf", {
              type: "geojson",
              data:
                "https://opendata.arcgis.com/datasets/dafad9fc0e854d9fb03d9cb00ea5e69c_0.geojson",
            });
            _map.map.addSource("tmah", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Targeted_Multifamily_Affordable_Housing/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            // Creating layers
            // _map.map.addLayer({
            //   'id': 'zoning',
            //   'type': 'line',
            //   'source': 'zoning',
            //   'source-layer': 'Zoning',
            //   "minzoom": 14,
            //   "layout": {
            //     "line-cap": "round",
            //     "line-join": "round"
            //   },
            //   "paint": {
            //     "line-color": "#b16776",
            //     "line-width":  3
            //   }
            //   });
            _map.map.addLayer({
              id: "zoning",
              type: "line",
              source: "zoning",
              "source-layer": "Zoning",
              layout: { visibility: "visible" },
              paint: {
                "line-color": [
                  'match',
                  ['get', 'ZONING_REV'],
                  "B1","#F1948A",
                  "B2","#EC7063",
                  "B3","#E74C3C",
                  "B4","#A93226",
                  "B5","#922B21",
                  "B6","#7B241C",
                  "M1","#EBDEF0",
                  "M2","#C39BD3",
                  "M3","#9B59B6",
                  "M4","#7D3C98",
                  "M5","#4A235A",
                  "P1","#CCD1D1",
                  "PC","#884EA0",
                  "PCA","#2471A3",
                  "PD","#3498DB",
                  "PR","#1E8449",
                  "SD1","#D4E6F1",
                  "SD2","#7FB3D5",
                  "SD3","#D7BDE2",
                  "SD4","#45B39D",
                  "SD5","#ff8f00",
                  "TM","#A2D9CE",
                  "W1","#82E0AA",
                  "R1","#FCF3CF",
                  "R2","#F9E79F",
                  "R3","#F4D03F",
                  "R4","#F1C40F",
                  "R5","#D4AC0D",
                  "R6","#B7950B", '#ccc'
                ],
                "line-width": 3
              }
            });
              
              // ============= transportation layers ===========
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
                paint: { "line-color": "#eb7609", "line-width": 2 },
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
              // ============= public assests layers ===========
              _map.map.addLayer({
                id: "fire-stations",
                type: "circle",
                source: "fire-stations",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 5,
                    stops: [
                      [12, 5],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#8f0408",
                },
              });
              _map.map.addLayer({
                id: "parks-fill",
                type: "fill",
                source: "active-parks",
                layout: { visibility: "none" },
                paint: { "fill-color": "#28f572", "fill-opacity": 0.5 },
              });
              _map.map.addLayer({
                id: "parks-line",
                type: "line",
                source: "active-parks",
                layout: { visibility: "none" },
                paint: { "line-color": "#28f572" },
              });
              // ============= for sale layers ===========
              _map.map.addLayer({
                id: "marijuana-legacy-land",
                type: "circle",
                source: "marijuana-legacy-land",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 5,
                    stops: [
                      [12, 5],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#002e00",
                },
              });
              _map.map.addLayer({
                id: "marijuana-legacy-structure",
                type: "circle",
                source: "marijuana-legacy-structure",
                layout: { visibility: "none" },
                paint: {
                  "circle-radius": {
                    base: 5,
                    stops: [
                      [12, 5],
                      [22, 120],
                    ],
                  },
                  "circle-color": "#028302",
                },
              });
              // ============= Planning and Housing layers ===========
              _map.map.addLayer({
                id: "opp-zones-fill",
                type: "fill",
                source: "opp-zones",
                layout: { visibility: "none" },
                paint: { "fill-color": "#83027d", "fill-opacity": 0.5 },
              });
              _map.map.addLayer({
                id: "opp-zones-line",
                type: "line",
                source: "opp-zones",
                layout: { visibility: "none" },
                paint: { "line-color": "#83027d" },
              });
              _map.map.addLayer({
                id: "snf-fill",
                type: "fill",
                source: "snf",
                layout: { visibility: "none" },
                paint: { "fill-color": "#804d24", "fill-opacity": 0.5 },
              });
              _map.map.addLayer({
                id: "snf-line",
                type: "line",
                source: "snf",
                layout: { visibility: "none" },
                paint: { "line-color": "#804d24" },
              });
              _map.map.addLayer({
                id: "tmah-fill",
                type: "fill",
                source: "tmah",
                layout: { visibility: "none" },
                paint: { "fill-color": "#0060dd", "fill-opacity": 0.5 },
              });
              _map.map.addLayer({
                id: "tmah-line",
                type: "line",
                source: "tmah",
                layout: { visibility: "none" },
                paint: { "line-color": "#0060dd" },
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
                _map.map.setFilter("zoning",["in", "ZONING_REV", "R1","R2","R3", "R4","R5"]); 
            });

            _map.map.on("click", "parcels-fill", function (e) {
                let parcel = _map.map.queryRenderedFeatures(e.point, {
                  layers: ["parcels-fill"],
                });
                _map.app.coords = [e.lngLat.lng,e.lngLat.lat];
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