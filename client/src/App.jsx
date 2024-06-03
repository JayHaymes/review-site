import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurant/:id/update' element={<UpdatePage />} />
                <Route path='/restaurant/:id' element={<RestaurantDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
