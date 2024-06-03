import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';

const App = () => {
    return (
        <RestaurantsContextProvider>
            <div className='container'>
                <Router>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/restaurant/:id/update' element={<UpdatePage />} />
                        <Route path='/restaurant/:id' element={<RestaurantDetailPage />} />
                    </Routes>
                </Router>
            </div>
        </RestaurantsContextProvider>
    );
}

export default App;
