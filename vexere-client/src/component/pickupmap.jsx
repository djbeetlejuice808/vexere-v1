import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { EnvironmentOutlined } from '@ant-design/icons'; 
import { renderToStaticMarkup } from 'react-dom/server'; 

const svgIcon = renderToStaticMarkup(<EnvironmentOutlined style={{ fontSize: '25px', color: '#ff0000' }} />);
const customIcon = new L.DivIcon({
    html: svgIcon,
    className: 'custom-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const fetchAddress = debounce((lat, lng, setAddress) => {
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=ed9ce87f350d49d29ddff8322c33dad1`)
        .then(response => {
            const address = response.data.results[0]?.formatted || 'Address not found';
            setAddress(address);
        })
        .catch(error => console.error('Error fetching the address:', error));
}, 500);

function LocationMarker({ setAddress }) {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
        click(e) {
            const newLatlng = e.latlng;
            if (!position || position.lat !== newLatlng.lat || position.lng !== newLatlng.lng) {
                setPosition(newLatlng);
                map.flyTo(newLatlng, map.getZoom());
                fetchAddress(newLatlng.lat, newLatlng.lng, setAddress);
            }
        }
    });

    return position === null ? null : (
        <Marker position={position} icon={customIcon}></Marker>
    );
}

export default function PickupMap({ setAddress }) {
    return (
        <MapContainer 
            center={[21.028511, 105.804817]} 
            zoom={13} 
            style={{ height: "400px", width: "100%" }}
            zoomAnimation={true} 
            zoomAnimationThreshold={4}
            markerZoomAnimation={true}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                updateWhenIdle={false}
                keepBuffer={2}
            />
            <LocationMarker setAddress={setAddress} />
        </MapContainer>
    );
}
