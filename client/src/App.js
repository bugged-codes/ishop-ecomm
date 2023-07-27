

import React, { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './Component/Header';
import Footer from './Component/Footer';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Slider from './Component/Slider';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Routing from './Component/Routing';


export const CartContext = createContext();
const API = "http://localhost:9000"
const App = () => {
  const [mobiles, setMobiles] = useState([]);
  useEffect(() => {
    fetch(`${API}/mobiles`)
      .then((data) => data.json())
      .then((mobile) => setMobiles(mobile))
  }, [])
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch(`${API}/cart`)
      .then((data) => data.json())
      .then((cartlist) => setCart(cartlist))
  }, [])

  const updateCart = ({ mobile, type }) => {

    fetch(`${API}/cart?type=${type}`, {
      method: 'PUT',
      body: JSON.stringify(mobile),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => data.json())
      .then((cartlist) => setCart(cartlist))

  }
  return (
    <div>
      <CartContext.Provider value={[cart, mobiles, updateCart]}>
        <Header />
        <Routing />

        <Footer />

      </CartContext.Provider>

    </div>
  )
}

export default App


function PhoneList() {
  const [, mobiles] = useContext(CartContext)
  return (
    <div className='phone-list-container'>
      {
        mobiles && mobiles.map((mobile) => (
          <Phone mobile={mobile} key={mobile._id} />))
      }
    </div>
  )
}


function Phone({ mobile }) {
  const [, , updateCart] = useContext(CartContext)


  return (
    <div className='phone-container'>
      <img src={mobile.image} alt={mobile.model} className='phone-img' />
      <h2 className='phone-name'>{mobile.name}</h2>
      <p className='phone-company'>{mobile.catagory}</p>
      <p className='old-price'>Rs.:{mobile.oPrice}/- </p>
      <h2>Rs :{mobile.price} /-</h2>
      <button className='add-btn'
        onClick={() => updateCart({ mobile, type: "increment" })}>
        <ShoppingCartIcon /> Add-to-Cart</button>
    </div>
  )
}


function CartList() {
  const [cart] = useContext(CartContext)
  function sum() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
      total = total + parseInt(cart[i].price) * cart[i].qty;
    }
    return total;
  }


  return (
    <div className='cart-phone-list-container'>
      <h1 className='heading-cart'>Cart-List</h1>
      {
        cart.map((mobile) => (
          <CartItem mobile={mobile} key={mobile._id} />
        ))
      }


      <h2 className='total-amout'>Total Order Amout : Rs. {sum()}/-</h2>

      <div className='pay'>

        <button className="button-pay" >Pay Now</button>
      </div>
    </div>
  )
}

function CartItem({ mobile }) {
  const [, , updateCart] = useContext(CartContext)
  console.log(mobile.price)
  return (
    <div className='cart-container'>
      <div className='cart-image-div'>
        <img className='phone-img' src={mobile.image} alt={mobile.name} />

      </div>
      <div className='description-product'>
        <h2 className='phone-name'>{mobile.name}</h2>
        <p className='phone-company'>{mobile.catagory}</p>

        <div className='cart-item-button'>
          <button className='incre-decre-btn'
            onClick={() => updateCart({ mobile, type: "increment" })}>+</button>
          <span> Quantity : {mobile.qty} </span>
          <button className='incre-decre-btn'
            onClick={() => updateCart({ mobile, type: "decrement" })}>-</button>
        </div>
      </div>
      <div>

        <h2>Price : Rs. {mobile.price* mobile.qty} /-</h2>
        <button className="button-buy" >Buy Now</button>

      </div>


    </div>
  )
}

export { CartList, PhoneList, Phone };