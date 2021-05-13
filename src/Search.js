// import React, { useState } from 'react';
// import SearchBar from './Search/SearchBar';
// import GoogleMap from 'google-map-react';
// import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
// import dotenv from 'dotenv';

// const containerStyle = {
//     width: '800px',
//     height: '600px',
// };
// const Search = () => {
//     console.log(StandaloneSearchBox);
//     const [apiReady, setApiReady] = useState(false);
//     const [map, setMap] = useState(null);
//     const [googlemaps, setGooglemaps] = useState(null);
//     const [center, setCenter] = useState({ lat: 37.5, lng: 127 });
//     let zoom = 10;
//     if (window.screen.width >= 768) {
//         zoom = 15;
//     }

//     const handleApiLoaded = (map, maps) => {
//         // map과 maps 개체가 로드됐다면, 각각의 state값에 넣어준다
//         if (map && maps) {
//             setApiReady(true);
//             setMap(map);
//             setGooglemaps(maps);
//         }
//     };
//     return (
//         <div style={containerStyle}>
//             {apiReady && googlemaps && (
//                 <SearchBar map={map} mapApi={googlemaps} />
//             )}
//             <GoogleMap
//                 bootstrapURLKeys={{
//                     key: process.env.REACT_APP_API_KEY,
//                     libraries: 'places',
//                 }}
//                 defaultCenter={center}
//                 defaultZoom={zoom}
//                 yesIWantToUseGoogleMapApiInternals
//                 onGoogleApiLoaded={({ map, maps }) =>
//                     handleApiLoaded(map, maps)
//                 }
//             ></GoogleMap>
//         </div>
//     );
// };

// export default Search;
import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
// const { compose, withProps, lifecycle } = require('recompose');
// const { withScriptjs } = require('react-google-maps');

// const {
//     StandaloneSearchBox,
// } = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const Search = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: (ref) => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.setState({
                        places,
                    });
                },
            });
        },
    }),
    withScriptjs,
)((props) => (
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Customized your placeholder"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </StandaloneSearchBox>
        <ol>
            {props.places.map(
                ({ place_id, formatted_address, geometry: { location } }) => (
                    <li key={place_id}>
                        {formatted_address}
                        {' at '}({location.lat()}, {location.lng()})
                    </li>
                ),
            )}
        </ol>
    </div>
));

export default Search;
