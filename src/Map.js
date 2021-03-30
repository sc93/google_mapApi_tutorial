import React, { useEffect, useState } from 'react';
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import dotenv from 'dotenv';
dotenv.config();

const containerStyle = {
    width: '800px',
    height: '400px',
};

const center = {
    lat: 37.497536340141046,
    lng: 127.02763080131218,
};

const divStyle = {
    background: `white`,
    width: '60px',
    height: '30px',
    fontSize: '0.6rem',
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY,
    });
    const [selectPlace, setSelectPlace] = useState(null);

    const onClick = (e) => {
        // 지도에서 선택한 곳의 위치
        const { lat, lng } = e.latLng;
        setSelectPlace({
            lat: lat(),
            lng: lng(),
        });
    };
    const onLoad = (infoWindow) => {
        console.log('infoWindow: ', infoWindow);
    };

    useEffect(() => {
        console.log(selectPlace);
    }, [selectPlace]);

    return isLoaded ? (
        <GoogleMap
            id="circle-example"
            mapContainerStyle={containerStyle}
            zoom={15}
            center={center}
            onClick={onClick}
        >
            {/* <Marker position={selectPlace}></Marker> */}
            {selectPlace && (
                <>
                    <InfoWindow onLoad={onLoad} position={selectPlace}>
                        <div style={divStyle}>
                            <h3>1</h3>
                        </div>
                    </InfoWindow>
                </>
            )}
        </GoogleMap>
    ) : (
        <></>
    );
};

export default React.memo(Map);
