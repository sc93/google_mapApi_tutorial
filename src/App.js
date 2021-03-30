import React, { useState } from 'react';
import Search from './Search';
import Map from './Map';
function App() {
    const [mapType, setMapType] = useState(true);

    return (
        <>
            {/* <div>
                <h1>지도에서 찾기</h1>
                <Map />
            </div> */}
            <div>
                <h1>검색으로 찾기</h1>
                <Search />
            </div>
        </>
    );
}

export default App;
