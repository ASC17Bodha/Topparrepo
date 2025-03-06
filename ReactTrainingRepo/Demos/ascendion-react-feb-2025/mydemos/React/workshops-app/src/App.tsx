import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Alert} from 'react-bootstrap';
import Menu from './components/common/Menu/Menu';
import { Home } from './components/Home/Home';
import { Container } from 'react-bootstrap';
import {Routes,Route, Navigate} from 'react-router-dom';
import HomePage from './pages/Home';
import { AlertMessage } from './components/common/Alert/Alert';
import WorkshopsListPage from "./pages/Workshops";
import AddWorkshopPage from "./pages/Workshops/add";
import FavoritesPage from "./pages/Workshops/favorite";
import NotFoundPage from './pages/not-found';
import WorkshopDetailsPage from './pages/Workshops/[id]';

function App() {


  return (
    <>
    <AlertMessage/>
    <Menu/>
    {/* <h1>{title}</h1>
    <button onClick={changeTitle}>Change Title</button>
    <span>You have clicked this button: </span>
    <span>{count} times</span> */}
<Container className="my-5">
    <Routes>
        <Route 
        path="/" 
        element={<HomePage />} />
        <Route 
        path="/home" 
        element={<Navigate to="/" />} />
        <Route 
          path="/workshops"
          element={<WorkshopsListPage />} />
        <Route
            path="/workshops/add"
            element={<AddWorkshopPage />}
        />
            <Route
            path="/workshops/:id/*"
            element={<WorkshopDetailsPage />} />
        <Route
            path="/workshops/favorites"
            element={<FavoritesPage />}
        />
        <Route 
        path="*" 
        element={<NotFoundPage />} />
    </Routes>
</Container>
    </>

  )
}

export default App;
