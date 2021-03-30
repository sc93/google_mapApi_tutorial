import React, { useState } from 'react';
import SearchBar from './Search/SearchBar';
import GoogleMap from 'google-map-react';
import dotenv from 'dotenv';

const containerStyle = {
    width: '800px',
    height: '600px',
};
const Search = () => {
    const [apiReady, setApiReady] = useState(false);
    const [map, setMap] = useState(null);
    const [googlemaps, setGooglemaps] = useState(null);
    const [center, setCenter] = useState({ lat: 37.5, lng: 127 });
    let zoom = 10;
    if (window.screen.width >= 768) {
        zoom = 15;
    }

    const handleApiLoaded = (map, maps) => {
        // map과 maps 개체가 로드됐다면, 각각의 state값에 넣어준다
        if (map && maps) {
            setApiReady(true);
            setMap(map);
            setGooglemaps(maps);
        }
    };
    return (
        <div style={containerStyle}>
            {apiReady && googlemaps && (
                <SearchBar map={map} mapApi={googlemaps} />
            )}
            <GoogleMap
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_API_KEY,
                    libraries: 'places',
                }}
                defaultCenter={center}
                defaultZoom={zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) =>
                    handleApiLoaded(map, maps)
                }
            ></GoogleMap>
        </div>
    );
};

export default Search;
