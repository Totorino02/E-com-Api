import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from './Login'
import Register from './Register'
const Home = () => {
  return (
    <div>
        <p>Totorino</p>
        {/* <BrowserRouter>
            <Routes>
                <Header/>
                <Footer/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </BrowserRouter> */}
    </div>
  )
}

export default Home