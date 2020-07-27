import React from 'react';
import "../css/Map.css"
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from '../utils/util';

function Map({ countries, casesType , center , zoom }) {
    
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* function to loop and draw circles */}
                {showDataOnMap( countries, casesType )}
            </LeafletMap>
        </div>
    );
}

export default Map
