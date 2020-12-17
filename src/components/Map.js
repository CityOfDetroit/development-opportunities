import mapboxgl from 'mapbox-gl';
import mapStyle from './style.json';
import './Map.scss';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiY2l0eW9mZGV0cm9pdGZpcmUiLCJhIjoiY2tpdDVnYnpyMG81NDMycnh0ZG5nOXU0cCJ9.XHsQ74nCMMOE6hYdXnSeyg';

export default class Map {
    constructor(container) {
        this.map = new mapboxgl.Map({
            container: container, // container id
            style: mapStyle, // stylesheet location
            center: [-83.1,42.36], // starting position [lng, lat]
            zoom: 12, // starting zoom
        });
        this.init(this);
    }

    init(_map){
        _map.map.addControl(new mapboxgl.NavigationControl());
        _map.map.on("load", function () {
            map.addSource("zoning", {
              type: "vector",
              url: "mapbox://cityofdetroit.5kwrqmxx",
            });
            map.addSource("completed-planning-projects", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27%27+AND+Status+%3D+%27Completed%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("planning-areas", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("mcm-business", {
              type: "geojson",
              data:
                "https://opendata.arcgis.com/datasets/76e09cb0417a452aba99608ccf40f116_0.geojson",
            });
            map.addSource("mc-restore", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/MCRS_Awardees/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=geojson",
            });
            map.addSource("vacant-multi", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/rosaparks_clairmount_mf/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("snf-areas", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/PlanningProjects/FeatureServer/0/query?where=SNF+%3D+%27SNF%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("open-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Open+to+Submissions%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("predevelopment-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Pre-Development%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("in-construction-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27In+Construction%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("completed-rfp", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Requests_for_Proposal/FeatureServer/0/query?where=status_public+%3D+%27Completed%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("targeted-multi-family-housing", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Targeted_Multifamily_Affordable_Housing/FeatureServer/0/query?where=1%3D1&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnHiddenFields=false&returnGeometry=true&returnCentroid=false&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
            });
            map.addSource("dlba-structures", {
              type: "vector",
              url: "mapbox://cityofdetroit.dlba_parcels",
            });
            map.addSource("dlba-vacant-lots", {
              type: "vector",
              url: "mapbox://cityofdetroit.dlba_parcels",
            });
            map.addSource("dlba-side-lots", {
              type: "vector",
              url: "mapbox://cityofdetroit.dlba_parcels",
            });
            map.addSource("dlba-auctions", {
              type: "vector",
              url: "mapbox://cityofdetroit.for_sale",
            });
            map.addSource("dlba-rehabbed-and-ready", {
              type: "vector",
              url: "mapbox://cityofdetroit.for_sale",
            });
            map.addSource("dlba-own-it-now", {
              type: "vector",
              url: "mapbox://cityofdetroit.for_sale",
            });
            map.addSource("peoplemover", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/Detroit_People_Mover_Route/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            map.addSource("mogobikes", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/MoGo_Bike_Share_Locations/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            map.addSource("ddotroutes", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/DDOT_Bus_Routes/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            map.addSource("smartroutes", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/SMART_Bus_Routes/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            map.addSource("qlineroute", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/QLine_Route/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
            map.addSource("qlinestops", {
              type: "geojson",
              data:
                "https://services2.arcgis.com/qvkbeam7Wirps6zC/arcgis/rest/services/QLine_Stops/FeatureServer/0/query?outFields=*&outSR=4326&where=1%3D1&f=geojson",
            });
        });
    }
}