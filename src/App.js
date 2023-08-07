import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage'
import MapPage from './components/MapPage';
import BoxPage from './components/BoxPage';
import ScatterplotPage from './components/ScatterplotPage';

export default function App() {
    // const margins = {
    //     left: 35,
    //     right: 35,
    //     top: 10,
    //     bottom: 35
    // };
    // const dims = {
    //     height: 575,
    //     width: 650  
    // };

    // const map_margins = {
    //   left: 35,
    //   right: 35,
    //   top: 10,
    //   bottom: 35
    // };
    // const map_dims = {
    //     height: 500,
    //     width: 750
    // };

    // const [selectedSort, setSelectedSort] = useState('alphabetical');

    // function handleSortingMethodChange(sort) {
    //   setSelectedSort(sort);
    // }

    // const [selectedColors, setSelectedColors] = useState(['FACILITY', 'SYRINGE']);
    
    // useEffect(() => {
    //   console.log("Updated selected colors:", selectedColors);
    // }, [selectedColors]);

    
    // function handleFilterItemClick(color) {
    //   if (selectedColors.includes(color)) {
    //     var newColors = selectedColors.filter((d) => d !== color);
    //     setSelectedColors(newColors);
    //     if (newColors.length === 0) {
    //       (color === 'FACILITY') ? setSelectedColors(['SYRINGE']) : setSelectedColors(['FACILITY'])
    //     }
    //   } else {
    //     setSelectedColors([...selectedColors, color]);
    //   }
    // }

    return (
      <div>
      <Router>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route path='/scatterplot' element={<ScatterplotPage />} />
                <Route path='/map' element={<MapPage />} />
                <Route path='/box' element={<BoxPage />} />
            </Routes>
        </Router>
      </div>
    );
} 
