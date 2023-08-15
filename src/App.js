import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage'
import MapPage from './components/MapPage';
import BoxPage from './components/BoxPage';
import ScatterplotPage from './components/ScatterplotPage';

export default function App() {
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
