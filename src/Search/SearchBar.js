import React, { useEffect, useRef, useState } from 'react';

class SearchBar extends React.Component {
    render() {
        return (
            <input
                id="pac-input"
                className="controls"
                type="text"
                placeholder="Search Box"
                ref={(ref) => (this.input = ref)}
            />
        );
    }

    componentDidMount({ map, mapApi } = this.props) {
        this.searchBox = new mapApi.places.SearchBox(this.input);
        // searchBox에서 장소 선택 시, 이벤트 발생
        // this.searchBox.addListener('places_changed', this.onPlacesChanged);
        this.searchBox.addListener('places_changed', function () {
            console.log(this);
        });

        // seachBox 결과가 map화면에 보여지며 해당 위치로 viewport가 이동
        // this.searchBox.bindTo('bounds', map);
        console.log(map.center.lat());
        console.log(map.center.lng());
    }
    componentWillUnmount({ mapApi } = this.props) {
        mapApi.event.clearInstanceListeners(this.input);
    }
}
// const SearchBar = ({ map, mapApi }) => {
//     const searchBox = useRef(null);
//     const input = useRef(null);
//     const onPlacesChanged = () => {
//         const selected = this.searchBox.getPlaces();
//         const { 0: place } = selected;

//         if (!place.geometry) return;

//         if (place.geometry.viewport) {
//             map.fitBounds(place.geometry.viewport);
//         } else {
//             map.setCenter(place.geometry.location);
//             map.setZoom(17);
//         }
//     };
//     useEffect(() => {
//         console.log(mapApi);
//         searchBox = new mapApi.places.SearchBox(input.current);
//         // searchBox에서 장소 선택 시, 이벤트 발생
//         searchBox.addListener('places_changed', onPlacesChanged);

//         // seachBox 결과가 map화면에 보여지며 해당 위치로 viewport가 이동
//         searchBox.bindTo('bounds', map);
//     }, [map, mapApi]);
//     return (
//         <input
//             id="pac-input"
//             className="controls"
//             type="text"
//             placeholder="Search Box"
//             ref={input}
//         />
//     );
// };

export default SearchBar;
