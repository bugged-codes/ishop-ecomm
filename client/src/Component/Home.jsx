import React, { useContext } from 'react'
import './Home.css'
import Slider from './Slider'
import { CartContext, Phone, PhoneList } from '../App'
const Home = () => {
    const [,mobiles]= useContext(CartContext)
    return (
        <>
        <Slider />
        <div className='ipad-div'>
      {
         mobiles && mobiles.filter((i)=>i.id<17).map((mobile) => (
          <Phone mobile={mobile} key={mobile._id} />))
      }
    </div>
        </>
    )
}

export default Home