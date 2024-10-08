import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import osm from "./osm-providers"; // Ensure this is correctly imported

const MapView = ({ position }) => {
    const [center, setCenter] = useState(position);
    const ZOOM_LEVEL = 20;
    const mapRef = useRef();

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "500px", width: "500px" }}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                            <Marker position={center}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MapView;

