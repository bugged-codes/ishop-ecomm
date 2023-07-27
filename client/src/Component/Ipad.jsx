import React, { useContext } from 'react'
import { CartContext, Phone } from '../App'
const Ipad = () => {
  const [,mobiles] = useContext(CartContext)
  console.log(mobiles)
  return (
    <div className='ipad-div'>
      {
         mobiles && mobiles.filter((i)=>i.catagory==="Ipad").map((mobile) => (
          <Phone mobile={mobile} key={mobile._id} />))
      }
    </div>
  )
}

export default Ipad