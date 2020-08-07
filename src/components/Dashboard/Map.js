import React from 'react';
import "../../css/Dashboard/Map.css"
import { Map , TileLayer } from "react-leaflet";
import { showDataOnMap } from '../../utils/util';

function CreateMap({ countries, casesType , center , zoom , countryInfo}) {
    //console.log(countries)
    console.log(countryInfo)
   

    return (
        <div className="map">
            <Map center={center} zoom={zoom}  >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {/* function to loop and draw circles */}
                {showDataOnMap( countries, casesType , countryInfo )}
            </Map>
        </div>
    );
}

export default CreateMap;
