import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Iphone from './Iphone'
import Home from './Home'
import Ipad from './Ipad'
import Macbook from './Macbook'
import Accessories from './Accessories'
import Store from './Store'
import { CartList } from '../App'
import Login from './Login'
import SignUp from './SignUp'


const Routing = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/ipad' element={<Ipad />}/>
        <Route path='/iphone' element={<Iphone />}/>
        <Route path='/macbook' element={<Macbook />}/>
        <Route path='/store' element={<Store />}/>
        <Route path='/accessories' element={<Accessories />}/>
        <Route path='/cart' element={<CartList />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
    </Routes>
        
    </>
  )
}

export default Routing