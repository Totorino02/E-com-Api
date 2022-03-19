import React from 'react';
import './App.css';
import axios from 'axios'
import {useSelector} from 'react-redux'
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const App = ()=> {

	const {isLoggedIn} = useSelector((state)=> state.auth);
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path='/' exact element={ isLoggedIn ? <Home/> : <Login/> }/>
					<Route path='/login' element={<Login/>}/>
					<Route path='/register' element={<Register/>}/>
				</Routes>
        	</BrowserRouter>
		</div>
	);
}

export default App;
